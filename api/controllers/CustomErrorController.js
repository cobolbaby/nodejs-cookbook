/**
 * CustomErrorController
 *
 * @description :: Server-side logic for managing Customerrors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


	/**
	 * `CustomErrorController.demo()`
	 */
	demo: function (req, res) {
		let err = {
			code: 500,
			message: JSON.stringify({
			  field1: "abc"
			})
		};
	  
		return res.json(err.code, JSON.parse(err.message));
	}
};

