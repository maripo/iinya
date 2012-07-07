function playSound ()
{
	playSoundAt (Math.floor(Math.random()*audios.length));
}
function playSoundAt (index)
{
	audios[index].play();
}