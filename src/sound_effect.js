var SoundEffect = function (options)
{
	this.url = options.url;
	this.label = options.label;
	this.date = options.date;
	this.volume = options.volume; //Percentage
	this.enabled = options.enabled;
};


SoundEffect.prototype.play = function ()
{
	console.log("play " + sound.url);
	var audio = new Audio(sound.url);
	audio.play();

};


SoundEffect.prototype.save = function ()
{

};

SoundEffect.prototype.delete = function ()
{

};

// JSON save & load
SoundEffect.saveAll = function ()
{

};
SoundEffect.loadAll = function ()
{

};