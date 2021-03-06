define(function(){
	
	/**
	 * A 2-dimensional vector in Euclidean space.
	 * @class
	 * @memberof thruster.math
	 * @param {Number} x The x component of the vector.
	 * @param {Number} y The y component of the vector.
	 */
	var Vector2d = function(x, y){
		/**
		 * The x component of this vector.
		 * @type Number
		 */
		this.x = x;
		
		/**
		 * The y component of this vector.
		 * @type Number
		 */
		this.y = y;
	};
	
	/**
	 * Create a new Vector2d from a provided angle and length.
	 * @static
	 * @param {Number} angle The angle of the vector in radians from the positive x axis.
	 * @param {Number} length The length of the vector.
	 * @returns {thruster.math.Vector2d}
	 */
	Vector2d.fromComponents = function(angle, length){
		return new Vector2d(length * Math.cos(angle), length * Math.sin(angle));
	};
	
	/**
	 * Creates a new Vector2d with the same x and y values.
	 * @returns {thruster.math.Vector2d}
	 */
	Vector2d.prototype.clone = function(){
		return new Vector2d(this.x, this.y);
	};
	
	/**
	 * Add another vector to this one.
	 * @param {thruster.math.Vector2d} vector The vector to add.
	 * @returns {thruster.math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.add = function(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};
	
	/**
	 * Returns the angle of this vector from the positive x axis.
	 * @returns {Number}
	 */
	Vector2d.prototype.angle = function(){
		return Math.atan2(this.y, this.x);
	};
	
	/**
	 * Returns the dot product of this vector with the other vector provided.
	 * @param {thruster.math.Vector2d} vector The other vector.
	 * @returns {Number}
	 */
	Vector2d.prototype.dot = function(vector){
		return (this.x * vector.x) + (this.y * vector.y);
	};
	
	/**
	 * Returns the length of this vector. If comparing vector lengths in high-frequency code,
	 * consider using {@link thruster.math.Vector2d#lengthSquared} for better performance.
	 * @returns {Number}
	 */
	Vector2d.prototype.length = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	};
	
	/**
	 * Returns the length of this vector squared.
	 * @returns {Number}
	 */
	Vector2d.prototype.lengthSquared = function(){
		return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	};
	
	/**
	 * Multiplies this vector by a scalar value.
	 * @param {Number} scalar The scalar value to multiply by.
	 * @returns {thruster.math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.multiply = function(scalar){
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};
	
	/**
	 * Modifies this vector to have length of 1, while preserving direction.
	 * @returns {thruster.math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.normalize = function(){
		var len = this.length();
		this.x /= len;
		this.y /= len;
		
		return this;
	};
	
	/**
	 * Returns the projection of this vector onto a target vector.
	 * @param {thruster.math.Vector2d} target The vector to project onto.
	 * @returns {thruster.math.Vector2d} The vector projection.
	 */
	Vector2d.prototype.projection = function(target){
		var x = target.x * (this.dot(target) / target.dot(target));
		var y = target.y * (this.dot(target) / target.dot(target));
		return new Vector2d(x, y);
	};
	
	/**
	 * Returns the vector rejection of this vector onto a target vector.
	 * @param {thruster.math.Vector2d} target The vector to reject onto.
	 * @returns {thruster.math.Vector2d} The vector rejection.
	 */
	Vector2d.prototype.rejection = function(target){
		var projection = this.projection(target),
			rejection = this.clone();
		
		// Vector rejection = original vector - projection
		rejection.subtract(projection);
		
		return rejection;
	};
	
	/**
	 * Rotates this vector by the given angle.
	 * @param {Number} angle The angle to rotate through in radians.
	 * @returns {thruster.math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.rotate = function(angle){
		var c = Math.cos(angle),
			s = Math.sin(angle),
			newX = this.x * c - this.y * s,
			newY = this.x * s + this.y * c;
		
		this.x = newX;
		this.y = newY;
		
		return this;
	};
	
	/**
	 * Returns the length of this vector in the direction of a target vector.
	 * @param {thruster.math.Vector2d} target The vector to project onto.
	 * @returns {Number}
	 */
	Vector2d.prototype.scalarProjection = function(target){
		return this.dot(target) / target.length();
	};
	
	/**
	 * Subtract another vector from this one.
	 * @param {thruster.math.Vector2d} vector The vector to subtract.
	 * @returns {thruster.math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.subtract = function(vector){
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	};
	
	return Vector2d;
	
});