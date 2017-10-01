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
	var s = {};

	/**
	 * Class used to proxy objects, enabling them to be be used with
	 * ConboJS two-way data binding as an alternative to a Hash
	 * 
	 * @class		ObjectUtils
	 * @author		Neil Rackett
	 */
	var ObjectProxy = conbo.EventDispatcher.extend(
	/** @lends conbo.ObjectProxy.prototype */
	{
		__construct: function(t)
		{
			if (s !== t)
			{
				throw new Error('ObjectProxy cannot be called or instantiated directly: use ObjectProxt.create()');
			}
		}
	},
	/** @lends conbo.ObjectProxy */
	{
		/**
		 * Wrap the specified object using an ObjectProxy
		 * 
		 * @memberof	ObjectProxy
		 * @method		create
		 * @param 		{*}				target - The object to proxy
		 * @param 		{boolean}		[strict=false] - Prevent reading or creation of dynamic and private properties?
		 * @returns		{ObjectProxy}
		 */
		create: function(target, strict)
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

			return new Proxy(new ObjectProxy(s), handler);
		}
	});

	return ObjectProxy;

}));
