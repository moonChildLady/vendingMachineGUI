$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		fwd = !fwd;  //  <--  add this line!!
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst = { left: 0 };
	opts.cssBefore= { top: 0 };
	opts.animIn   = { left: 0 };
	opts.animOut  = { top: 0 };
};
