$(document).ready(function(){console.log("ChuckType Engine V0.4a");var t=function(t,e){this.keystrokeCounter=0,this.points=0,this.time=0,this.user_id=document.getElementsByClassName("userData")[0].getAttribute("data-user"),this.viewableNextWords=12,this.stringsArray=this.word_to_array(e),this.wordsCount=this.stringsArray.length,this.lettersCount=document.getElementById(e).innerHTML.length,console.log(this.lettersCount),this.nextWords=t,this.viewHelper(t),this.addKeyListener()};t.prototype={clearInput:function(t){t.val("")},checkWord:function(t,e){return e=e.replace(/\s/g,""),x=t==e},word_to_array:function(t){return array=document.getElementById(t).innerHTML.split(" ")},sendGameData:function(t){$.ajax({url:"/races",type:"POST",data:t})},limitView:function(){this.wordsCount-this.points<this.viewableNextWords&&(this.viewableNextWords=this.wordsCount-this.points,this.viewableNextWords<1&&(document.getElementsByClassName("timer").innerHTML="YOU FINISHED",$(gameInput).prop("disabled",!0),this.elapsed=this.stop(),this.accuracyResult=this.accuracy(this.lettersCount,this.keystrokeCounter),wpm=Math.round(this.wordsCount/(this.elapsed/60)),$("#sec").html("WPM: "+wpm),this.item={race:{wpm:wpm,accuracy:this.accuracyResult,finished_time:this.elapsed,user_id:this.user_id}},this.sendGameData(this.item),$(".new-game").removeClass("hide")))},viewHelper:function(){var t="";this.limitView();for(var e=0;e<this.viewableNextWords;e++)t+=0==e?"<strong>"+this.stringsArray[this.points+e]+"</strong> ":this.stringsArray[this.points+e]+" ";$(this.nextWords).html(t)},start:function(){clearInterval(this.timer),this.addInputValidation();var t=this;t.time=0,$(gameInput).prop("disabled",!1),$(gameInput).focus(),this.timer=setInterval(function(){t.time+=1e3,t.elapsed=Math.floor(t.time/1e3)/1,$("#sec").html(t.elapsed+" <span class='small'>sec</span>")},1e3)},stop:function(){return clearInterval(this.timer),elapsed=Math.floor(this.time/1e3)/1,elapsed},addKeyListener:function(){var t=this;$(gameInput).keypress(function(e){t.keyPressed=e.which,t.keystrokeCounter++})},addInputValidation:function(){var t=this;$(gameInput).on("input",function(){(32==t.keyPressed&&1!=t.viewableNextWords||1==t.viewableNextWords)&&(val=$(gameInput).val(),word_validator=t.checkWord(t.stringsArray[t.points],val),word_validator&&(t.clearInput($(gameInput)),t.points++,t.viewHelper()))})},accuracy:function(t,e){var s=t-(e-t),i=s/t;return(100*i).toFixed(2)}},$(".timer").startTimer({onComplete:function(){$(this).html("START!"),userRace=new t(".next-word","gameText"),userRace.start()}})});