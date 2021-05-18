// Scalability

/* 9.1 Stock Data
    Imagine you are building some sort of service that will be called by up to 1,000 client applications to get simple end-of-day stock price info (open, close, high, low). You may asssume that you already have the data and you can store it in any format you wish. How would you design the client-facing service that provides the information to client applications? You are responsible for the development, rollout, and ongoing monitoring and maintenance of the feed. Describe the different methods you considered and why you would recommend your approach. Your service can use any technologies you wish, and can distribute the information to the client applications in any mechanism you choose.

*/

/* 
    GOOG: [
        {
            open: "100",
            close: "200",
            high: "350",
            low: "75"
        }
        rank: 1000
        machineNum: 1
    ]
    CRLSCRS: [
        {
            open: "100",
            close: "200",
            high: "350",
            low: "75"
        }
        rank: 100
        machineNum: 5``
    ]
    Lookup query could be
        "GOOG"
    Service would need to determine which machine has the data. Query the lookup table from each machine

    You could associate a stock symbol with a machine.



    Cluster 1 contains all of the most popular/frequently searched stocks 
        Most available machine contains list of most popular/frequently searched stocks with ranks of 500 to 1000
    Machines need to contain a lookup table of the stocks they have. 
    
    etc.

    Machine 1
    {"GOOG", "APPL", "TSLA"}
    
    Machine 5
    {"BOBTRCKNG", "CRLSCRS"}
*/

/* 
    We need to focus on how we actually distribute the information to clients. Assume that we have some scripts that magically collect the information.

    Different aspects to think about with a given proposal
        Client Ease of Use - Want the service to be easy for clients to implement and useful for them.
        Ease for Ourselves - This service should be as easy as possible of us to implement, as we shouldn't impose unnecessary work on ourselves. Need to consider cost of implementing, but also the cost of maintenance.
        Flexibility for Future Demands - The problem we're given is stated in a what would you do in the real world way. Think like you would in a real world problem. Ideally you would not want to overly contrain 
            yourself in the implementation, such that we can't be flexible if the requirements or demands change.
        Scalability and Efficiency - Be mindful of the efficiency of the solution, so as not to overly burden our service.

    Proposal #1
        All data stored in a simple text file that clients download through an FTP server or something.

    Proposal #2
        Use a standard SQL database and let clients plug directly into that.

    Proposal #3
        XML is another great option for distributing the information. The data has fixed format and fixed size:
            stock_symbol, open, high, low, close
                <root>
                    <date value="2008-10-12">
                        <stock symbol="GOOG">
                            <open>125.32</open>
                            <high>130.27</high>
                            <low>75.00</low>
                            <close>127.30</close>
                        </stock>
                        <stock symbol="APPL">
                            <open>225.32</open>
                            <high>230.27</high>
                            <low>75.00</low>
                            <close>227.30</close>
                        </stock>
                    </date>
                    <date value="2008-10-11">
                        ...
                    </date>
                </root>
        Advantages
            - Easy to distribute, can be easily read by machines and humans. This is one reason why XML is a standard data model to share and distribute data.
            - Most languages have a library to perform XML parsing making it reasonably easy for clients to implement.
            - Easy to add new data to the XML by adding additional nodes. Wouldn't easily break the client's parserj.
            - Since data is stored as XML we can use existing tools for backing up the data. Don't really need to implement our own backup tool.
        Disadvantages   
            - Sends clients all the information, even if they only want part of it.
            - Performing any queries on the data requires parsing the entire file.
        

 */

/* 9.2 Social Network
    How would you design the data structures for a very large social network like Facebook or LinkedIn? Describe how you would design an algorithm to show the shortest path between two people
    e.g. (Me -> Bob -> Susan -> Jason -> You)
 */

/* 
   Simplify the problem - Forget about the Millions of Users for now
       Design for the simple case first
       We can construct a graph by treating each person as a node and letting an edge between two nodes indicate that the two users are friends.
       If I wanted to find the path between two people, I could start with one person and do a simple breadth-first search

       BI-DIRECTIONAL BREADTH FIRST SEARCH
           Start from source and destination and when they collide we know we've found a path.
       In the implementation we'll use two classes to help us. BFSData holds the data we need for a breadth-first search, such as the isVisited hash table and the toVisit queue. PathNode will represent the path as we're searching it, storing each Person and the previousNode we visited in this path.
*/

const findPathBiBFS: LinkedList<Person> = (people: HashMap<Number, Person>, source: Number, destination: Number) => {
    const sourceData: BFSData = new BFSData(people.get(source));
    const destData: BFSData = new BFSData(people.get(destination));

    while (!sourceData.isFinished() && !destData.isFinished()) {
        /* Search out from source */
        let collision: Person = searchLevel(people, sourceData, destData);
        if (collision !== null) {
            return mergePaths(sourceData, destData, collision.getId());
        }

        /* Search out from destination */
        collision = searchLevel(people, destData, sourceData);
        if (collision !== null) {
            return mergePaths(sourceData, destData, collision.getId());
        }

    }
    return null;

}

const searchLevel: Person = (people: HashMap<Number, Person>, primary: BFSData, secondary: BFSData) => {
    /* 
        Only want to search one level at a time. Count how many nodes are currently in the primary's level and only do that many nodes.
        We'll continue to add nodes to the end.
    */

    const count = primary.toVisit.size();
    for (let i = 0; i < count; i++) {
        // Pull out first node. Queue poll() returns AND removes the element at the front of the container.
        const pathNode: PathNode = primary.toVisit.poll();
        const personId = pathNode.getPerson().getId();

        // Check if already visited
        if(secondary.visited.containsKey(personId)) {
            return pathNode.getPerson();
        }

        // Add friends to queue
        const person: Person = pathNode.getPerson();
        const friends: ArrayList<Number> = person.getFriends();
        for(const friendId of friends) {
            if(!primary.visited.containsKey(friendId)) {
                const friend: Person = people.get(friendId);
                const next: PathNode = new PathNode(friend, pathNode);
                primary.visited.put(friendId, next);
                primary.toVisit.add(next);
            }
        }
    }
    return null;
}

// Merge the path where the searches met at connection
const mergePaths: LinkedList<Person> = (bfs1: BFSData, bfs2: BFSData, connection: Number) => {
    const end1: PathNode = bfs1.visited.get(connection); // end1 => source
    const end2: PathNode = bfs2.visited.get(connection);

    const pathOne: LinkedList<Person> = end1.collapse(false);
    const pathTwo: LinkedList<Person> = end2.collapse(true); // reverse

    pathTwo.removeFirst(); // Remove connection
    pathOne.addAll(pathTwo); // Add second path

    return pathOne;
}

class PathNode {
    person: Person = null;
    previousNode: PathNode = null;

    constructor(p: Person, previous: PathNode) {
        this.person = p;
        this.previousNode = previous;
    }

    getPerson: Person = function() {
        return this.person;
    }

    collapse: LinkedList<Person> = function(startsWithRoot: Boolean) {
        const path: LinkedList<Person> = new LinkedList<Person>();
        let node: PathNode = this;

        while(node !== null) {
            if(startsWithRoot) {
                path.addLast(node.person);
            } else {
                path.addFirst(node.person);
            }
            node = node.previousNode;
        }
        return path;
    }
}

class BFSData {
    toVisit: Queue<PathNode> = new LinkedList<PathNode>();
    visited: HashMap<Number, PathNode> = new HashMap<Number, PathNode>();

    constructor(root: Person) {
        const sourcePath: PathNode = new PathNode(root, null);
        this.toVisit.add(sourcePath);
        this.visited.put(root.getId(), sourcePath);
    }

    isFinished: any = function() { // This is supposed to a Boolean return type
        return this.toVisit.isEmpty();
    }
}


/* 9.5 Cache
    Imagine a web server for a simplified search engine. This system has 100 machines to respond to search queries, which may then call out using processSearch(query: string) to another cluster of machines to actually get the result. The machine which responds to a given query is chosen at random, so you cannot guarantee that the same machine will always respond to the same request. The method processSearch() is very expensive. Design a caching mechanism to cache the results of the most recent queries. Be sure to explain how you would update the cache when data changes.
*/

/* 
Some reasonable assumptions for the purpose of the solution:
    Other than calling out to processSearch() as necessary, all query processing happens on the initial machine that was called.
    Number of queries we wish to cache is large (in the millions)
    Calling between machines is relatively quick
    The result for a given query is an ordered list of URLs, each of which has an associated 50 character title and 200 character summary.
    The most popular queries are extremely popular, such that they would always appear in the cache.

System Requirements
    When designing the cache we know we'll need to support two primary functions:
        Efficient lookups given a key
        Expiration of old data so that it can be replaced with new data.

    Step 1: Design a Cache for a single system
        Start by designing for a single machine. How would you create a datastructure that enables you to easily purge old data and also efficiently look up a value based on a key?
            - A linked list would allow easy purging of old data, by moving "fresh" items to the front. We could implement it to remove the last element of the linked list when the list exceeds a certain size.
            - A hash table allows efficient lookups of data, but it wouldn't ordinarily allow easy data purging.
        We can merge both of those data structures to get the best of both worlds.

        Create a linked list where a node is moved to the front every time it's accessed. This way the end of the linked list will always contain the stalest information.
        In addition, we have a hash table that maps from a query to the corresponding node in the linked list. This allows us to not only efficiently return the cached results, but also to move the appropriate node to the front of the list, thereby updating its, "freshness."

    
*/


/* 9.6 Sales Rank
    A large eCommerce company wishes to list the best-selling products, overall and by category. For example, one product migh tbe the #1056th best-selling product overall but the #13th best-selling product under "Sports Equipment" and the #24th best selling product under "Safety."
    How to design this system?
*/

/* 
    Step 1:
    First need to define exactly what we're building. 
        Assume that you're only designing the components relevant to the question, and not the entire eCommerce system. In this case we might touch 
        the design of the front end and purchase components, but only as it impacts the sales rank.

    ** Also need to define what the sales rank means. Is it total sales over all time? Sales in the last month? Last week?
        Or is it some more complex function like something involving exponential decay of sales data? 
        DEFINE THE TIME PERIOD FOR HOW RANKINGS WORK - Life Span, expiration times etc.
    
    For this we're assuming that each product can be in multiple categories but there is not a concept of sub-categories.

    Step 2:
    How accurate and up to date does the data need to be? How old can the data be for the most popular items/results? For this problem we are 
        going to assume that data can be up to 1 hour old for the top most popular items (top 100 items in each category), and up to one day old for less popular items.

    Precision should be important for popular items but less for less popular items.

    We are going to assume that data should updated every hour (for the most popular items). Time range for our data doesn't have to be most popular items within exactly one week, could be like most popular within the last 150 hours instead of exactly 168 which is 7 days.
    
    Step 3: 
    Draw the major components.

    ** REMEMBER TO DO THINGS IN BATCHES WHEN POSSIBLE
    ** CONSIDER MEMORY/SPACE COMPLEXITY
    If something doesn't have to be immediately written to a table or somewhere, batch the records while still adding to a log file.
    You would need redundancy if your batch died.

    Definitely need to consider whether or not it's feasible to hold all of our sales data in memory when we're handling these records. If there are 10 million products in the system, can we store each (along with a count) in a hash table? YES. If each product ID is 4 bytes (which is large enough to hold up to 4 billion unique ids) and each count is also 4 bytes, then such a hash table would only take about 40 Megabytes.




*/