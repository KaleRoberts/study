// Apply Call Bind

const cylinder = {
    pi: 3.14,
    volume: function(r, h) {
        return this.pi * r * r * h;
    }
};

console.log(cylinder.volume.call({pi: 3.1415926}, 2, 6));   // Passed context is swapping out pi
console.log(cylinder.volume.apply({pi: 3.141519}, [2, 6])); // Passed context is swapping out pi again but then 
// method arguments are passed in an array
console.log(cylinder.volume(2, 6));

const newVolume = cylinder.volume.bind({pi: 3.14159}); // Not invoked immediately

setTimeout(() => {
  console.log("Hi!!");
}, 100);

newVolume(2,6);

