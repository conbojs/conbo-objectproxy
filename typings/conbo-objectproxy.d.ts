export = ObjectProxy;

import * as conbo from 'conbo';

/**
 * Pseudo-class to proxy objects, enabling them to be be used with
 * ConboJS two-way data binding as an alternative to a Hash
 * 
 * @author		Neil Rackett
 */
declare class ObjectProxy extends conbo.EventDispatcher
{
	/**
	 * Wraps the specified object using an ObjectProxy
	 * 
	 * @param 		{any}		target - The object to proxy
	 * @param 		{boolean}	[strict=false] - Prevent reading or creation of dynamic and private properties?
	 */
	public static create(target:any, strict?:boolean):ObjectProxy;
}
