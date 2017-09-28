var obj = {a:0};
var proxy = ObjectProxy(obj, true);

proxy.addEventListener('change', (event) => 
{
	console.log(`Property "${event.property}" changed to ${JSON.stringify(event.value)}`);
});

setInterval(() => ++proxy.a, 1000);
