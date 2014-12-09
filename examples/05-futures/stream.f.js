
// Infite stream implementation with Basic promises.

// inspired by 
// http://perl.plover.com/Stream/stream.html#streams

var Stream = function(_head, _tail) { 
	this.h = _head;
	this.t = _tail;
};

Stream.prototype.head = function() {
	return this.h;
}

Stream.prototype.tail = function() {
	var _tail = this.t;
	if (_tail instanceof Function) {
		console.log('call tail promise');
		this.t = _tail();
	}

	return this.t;
}

Stream.prototype.show = function(len) { 
	var cpos = 0;
	var self = this;

	do { 
		console.log('element', cpos, ':', self.head());
		self = self.tail();
		cpos++;
	} while(cpos < len);
}

// --- code now ---

function tabulate (f, n) { 
 	console.log('instance of new Stream...');

	return new Stream(
		f(n), function() { 
			return tabulate(f, n + 1);
		}
	);
}

var square = function(a) {
	return a * a;
}

console.log('tabulate...');
squares = new tabulate(square, 1);

console.log('show stream...');
squares.show(5);

squares.show(3);


