/**
 * Pseudo-class to Proxy objects, enabling them to be be used with
 * ConboJS two-way data binding as an alternative to a Hash
 * 
 * @author		Neil Rackett
 * @param 		{*}			target - The object to proxy
 * @param 		{boolean}	[strict=false] - Prevent reading or creation of dynamic and private properties?
 */
function ObjectProxy(target, strict)
{
	var exists = function(name, obj)
	{
		obj || (obj = target);

		if (strict)
		{
			if (/^_/.test(name)) throw new Error('Property "'+name+'" on '+obj+' is private');
			if (!(name in obj)) throw new Error('Property "'+name+'" does not exist on '+obj);
		}

		return true;
	};

	var handler =
	{
		get: (eventDispatcher, name) =>
		{
			if (name in eventDispatcher || /^__/.test(name))
			{
				return eventDispatcher[name];
			}

			if (exists(name))
			{
				return target[name];
			}
		},
	
		set: (eventDispatcher, name, value) =>
		{
			if (exists(name) && obj[name] !== value)
			{
				target[name] = value;
				eventDispatcher.dispatchEvent(new conbo.ConboEvent(conbo.ConboEvent.CHANGE, {property:name, value:value}));
			}
		},
	
	};

	return new Proxy(new conbo.EventDispatcher(), handler);
}

/**
 * Wraps the specified object using an ObjectProxy
 * 
 * @memberof	ObjectProxy
 * @method		create
 * @param 		{*}			target - The object to proxy
 * @param 		{boolean}	[strict=false] - Prevent reading or creation of dynamic and private properties?
 */
ObjectProxy.create = ObjectProxy;
