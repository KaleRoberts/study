### 1.10.2 Common pitfalls to avoid when using the scripting APIs
This section is non-normative.

Scripts in HTML have "run-to-completion" semantics, meaning that the browser will generally run the script uninterrupted before doing anything else, such as firing further events or continuing to parse the document.

On the other hand, parsing of HTML files happens incrementally, meaning that the parser can pause at any point to let scripts run. This is generally a good thing, but it does mean that authors need to be careful to avoid hooking event handlers after the events could have possibly fired.

There are two techniques for doing this reliably: use event handler content attributes, or create the element and add the event handlers in the same script. The latter is safe because, as mentioned earlier, scripts are run to completion before further events can fire.

One way this could manifest itself is with img elements and the load event. The event could fire as soon as the element has been parsed, especially if the image has already been cached (which is common).

Here, the author uses the onload handler on an img element to catch the load event:

<img src="games.png" alt="Games" onload="gamesLogoHasLoaded(event)">
If the element is being added by script, then so long as the event handlers are added in the same script, the event will still not be missed:

<script>
 var img = new Image();
 img.src = 'games.png';
 img.alt = 'Games';
 img.onload = gamesLogoHasLoaded;
 // img.addEventListener('load', gamesLogoHasLoaded, false); // would work also
</script>
However, if the author first created the img element and then in a separate script added the event listeners, there's a chance that the load event would be fired in between, leading it to be missed:

<!-- Do not use this style, it has a race condition! -->
 <img id="games" src="games.png" alt="Games">
 <!-- the 'load' event might fire here while the parser is taking a
      break, in which case you will not see it! -->
 <script>
  var img = document.getElementById('games');
  img.onload = gamesLogoHasLoaded; // might never fire!
 </script>

### Web security
The security model of the web is based on the concept of "origins", and correspondingly many of the potential attacks on the web involve cross-origin actions. [ORIGIN]

Not validating user input can lead to Cross-site scripting attacs (XSS)
When accepting untrusted input, e.g. user-generated content such as text comments, values in URL parameters, messages from third-party sites, etc, it is imperative that the data be validated before use, and properly escaped when displayed. Failing to do this can allow a hostile user to perform a variety of attacks, ranging from the potentially benign, such as providing bogus user information like a negative age, to the serious, such as running scripts every time a user looks at a page that includes the information, potentially propagating the attack in the process, to the catastrophic, such as deleting all data in the server.

When writing filters to validate user input, it is imperative that filters always be safelist-based, allowing known-safe constructs and disallowing all other input. Blocklist-based filters that disallow known-bad inputs and allow everything else are not secure, as not everything that is bad is yet known (for example, because it might be invented in the future).

### Cross-site request forgery (CSRF)
If a site allows a user to make form submissions with user-specific side-effects, for example posting messages on a forum under the user's name, making purchases, or applying for a passport, it is important to verify that the request was made by the user intentionally, rather than by another site tricking the user into making the request unknowingly.

This problem exists because HTML forms can be submitted to other origins.

Sites can prevent such attacks by populating forms with user-specific hidden tokens, or by checking `Origin` headers on all requests.


### HTML (the markup) is parsed into the DOM


### Another race condition example
The following solution suffers from race conditions:

1. Let p be a new promise.

2. Run the following steps in parallel:

    1. If nameList contains name, reject p with a TypeError and abort these steps.

    2. Do some potentially lengthy work.

    3. Append name to nameList.

    4. Resolve p with undefined.

3. Return p.

Two invocations of the above could run simultaneously, meaning name isn't in nameList during step 2.1, but it might be added before step 2.3 runs, meaning name ends up in nameList twice.

------------

Parallel queues solve this. The standard would let nameListQueue be the result of starting a new parallel queue, then:

1. Let p be a new promise.

2. Enqueue the following steps to nameListQueue:

    1. If nameList contains name, reject p with a TypeError and abort these steps.

    2. .Do some potentially lengthy work.

    3. Append name to nameList.

    4. Resolve p with undefined.

3. Return p.

The steps would now queue and the race is avoided.0