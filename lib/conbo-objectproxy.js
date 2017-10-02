(function(window, factory)
{
	if (typeof define === 'function' && define.amd) 
	{
		define('conbo-objectproxy', ['conbo'], factory);
	}
	else if (typeof module !== 'undefined' && module.exports)
	{
		module.exports = factory(require('conbo'));
	}
	else
	{
		window.ObjectProxy = factory(window.conbo);
	}
}
(this, function(conbo)
{
	const s = {};

	/**
	 * Class used to proxy objects, enabling them to be be used with
	 * ConboJS two-way data binding as an alternative to a Hash
	 * 
	 * @class		ObjectUtils
	 * @author		Neil Rackett
	 */
	class ObjectProxy extends conbo.EventDispatcher
	{
		__construct(t)
		{
			if (s !== t)
			{
				throw new Error('ObjectProxy cannot be called or instantiated directly: use ObjectProxy.create()');
			}
		}

		/**
		 * Wrap the specified object using an ObjectProxy
		 * 
		 * @param 		{*}				target - The object to proxy
		 * @param 		{boolean}		[strict=false] - Prevent reading or creation of dynamic and private properties?
		 * @returns		{ObjectProxy}
		 */
		static create(target, strict)
		{
			let exists = function(name, obj)
			{
				obj || (obj = target);

				if (strict)
				{
					if (/^_/.test(name)) throw new Error('Property "'+name+'" on '+obj+' is private');
					if (!(name in obj)) throw new Error('Property "'+name+'" does not exist on '+obj);
				}

				return true;
			};

			let handler =
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

			return new Proxy(new ObjectProxy(s), handler);
		}
	}

	return ObjectProxy;

}));
