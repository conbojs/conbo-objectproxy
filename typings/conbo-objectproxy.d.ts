export as namespace ObjectProxy;
export = ObjectProxy;

import * as conbo from 'conbo';

/**
 * Pseudo-class to proxy objects, enabling them to be be used with
 * ConboJS two-way data binding as an alternative to a Hash
 * 
 * @author		Neil Rackett
 * @param 		{any}			target - The object to proxy
 * @param 		{boolean}		[strict=false] - Prevent reading or creation of dynamic and private properties?
 */
declare function ObjectProxy(target:any, strict?:boolean):any;

declare namespace ObjectProxy
{
	/**
	 * Wraps the specified object using an ObjectProxy
	 * 
	 * @memberof	ObjectProxy
	 * @method		create
	 * @param 		{*}			target - The object to proxy
	 * @param 		{boolean}	[strict=false] - Prevent reading or creation of dynamic and private properties?
	 */
	function create(target:any, strict?:boolean):any;
}
