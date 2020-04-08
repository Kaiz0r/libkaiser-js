(function(){

var fnProto = Function.prototype,
	docString = function(){
		var doc = this[this.toSource ? 'toSource' : 'toString']().match(/['"]\*(.*)\*['"]/);
		return (doc) ? doc[1].replace(/^\s+|\s+$/g, '') : '';
	};

if (Object.defineProperty) Object.defineProperty(fnProto, 'docString', {get: docString});
else if (fnProto.__defineGetter__) fnProto.__defineGetter__('docString', docString);
else fnProto.docString = '';
})();

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Array.prototype.cut = function(target){	this.splice (this.indexOf(target), 1); };
String.prototype.ssplit = function() { return exports.ssplit(this); };
String.prototype.zp = function(n) { return '0'.times(n - this.length) + this; };
String.prototype.reverse = function() { return this.split('').reverse().join(''); };
String.prototype.lower = function() { return this.toLowerCase(); };
String.prototype.toNumber = function() { return Number(this); };
String.prototype.asTime = function() { return Number(this).asTime(); };
String.prototype.stripAll = function() {return this.replace(/(\r\n\t|\n|\r\t)/gm,"");};

Number.prototype.zp = function(n) { return this.toString().zp(n); };
Number.prototype.truncate = function(n){return Math.round(this * Math.pow(10, n)) / Math.pow(10, n);};

Number.prototype.as = function(def){ if (this == 0){return def;}else{return this;};};

Number.prototype.asTime = function(){
	let minutes = Math.floor(this / 60);
	let seconds = this - minutes * 60;
	if(minutes<10){minutes = `0${minutes}`;}
	
	if(seconds<10){seconds = `0${seconds}`;}
	
	return `${minutes}:${seconds}`;
};

exports.defaultNum = function(value){
	if(value == undefined) return 0;
	return value;
};

exports.ssplit = function(s){
	var myRegexp = /[^\s"]+|"([^"]*)"/gi;
	var myArray = [];

	do {
		var match = myRegexp.exec(s);
		if (match != null)
		{
			myArray.push(match[1] ? match[1] : match[0]);
		}
	} while (match != null);
	
	return myArray;
};

exports.wrap = function(msg, wrapper){
	if (wrapper == undefined) { wrapper = "```"; }
	return "```\n"+msg+"\n```";
};

exports.code = function(msg, lang){
	if (lang == undefined) { lang = ""; }
	return "```"+lang+"\n"+msg+"\n```";
};

exports.space = function(base, count, next){
	count -= base.length;
	if(count < 0){count = 5;}
	const pre = " ".repeat(count);
	return pre+next;
};

exports.echo = function(message, tag="none", timestamp=false){
	exports.print(mesage, tag, timestamp);
};

exports.print = function(message, tag="none", timestamp=true){
	ts = "";
	if (timestamp){
		ts = moment().format('MM-D-YYYY HH:mm:ss')+" | ";
	}
	
	if (tag == "say"){
		stag = "[SAY]".yellow;
		console.log(ts+" "+stag+" | "+message);
	}else if(tag == "info"){
		stag = "[INF]".white;
		console.log(ts+" "+stag+" | "+message);
	}else if(tag == "warn"){
		stag = "[WAR]".red;
		console.log(ts+" "+stag+" | "+message);
	}else{
		console.log(ts+message);
	}
};

