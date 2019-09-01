// var x=document.querySelectorAll("input");
// x[0].setAttribute("value","1");
// x[0].disabled=true;
var size=4;
var display=document.querySelectorAll("h1")[1];
var arr = new Array(size);
for(var i=0;i<size;i++)
	arr[i]=new Array(size);

var inp=document.querySelectorAll("input");
var submit=document.querySelector("button");
var reset=document.querySelectorAll("button")[1];


function initialise()
{
	var cnt=0;
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<size;j++){
			arr[i][j]=0;
			inp[cnt].value="";
			inp[cnt++].disabled=false;
		}
	}
	display.textContent="SOLVE THIS";
	document.querySelector("body").classList.remove("loosing");
	document.querySelector("body").classList.remove("winning");


}
submit.addEventListener("click",function(){
	var cnt=0;
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<size;j++)
		{
			if(inp[cnt].value!="")
				arr[i][j]=inp[cnt].value;
			else{
				arr[i][j]="0";

			}
			cnt++;
		}
	}
	var win=1;
	for(var i=0;i<size;i++)
	{
		var fr=new  Array(size+1);
		for(var j=0;j<=size;j++)
			fr[j]=0;
		for(var j=0;j<size;j++)
		{
			if(arr[i][j]=="0"||fr[Number(arr[i][j])]==1)
				win=0;
			else
				fr[Number(arr[i][j])]=1;
		}
	}
	if(win)
		winn();
	else
		loose();

});
function loose(){
	// alert("you loose");
	display.textContent="YOU HAVE A BAD DAY";
	document.querySelector("body").classList.add("loosing");
}
function winn(){
	document.querySelector("body").classList.add("winning");
	display.textContent="YOU ARE GIVING A PARTY TODAY!!";
	// alert("you won");
}


function solver()
{
	// console.log(arr);
	var pos=[];
	for(var i=0;i<size;i++)
	{
		for(var j=0;j<size;j++)
		{
			if(arr[i][j]==0)
			{
				pos.push([i,j]);
			}

		}
	}
	if(pos.length==0)
		return true;
	var ind=Math.floor(Math.random()*pos.length);
	var x=pos[ind][0],y=pos[ind][1];
	for(var digit=1;digit<=size;digit++)
	{
		arr[x][y]=digit;
		if(conflict(x,y,digit)){
			var temp=solver();
			if(temp)
				return true;
		}
		// console.log(digit);
	}
	arr[x][y]=0;
	return false;

}

function conflict(x,y,digit)
{
	var ans=true;
	for(var i=0;i<size;i++)
	{
		if((arr[x][i]==digit&&i!=y)||(i!=x&&arr[i][y]==digit))
			ans=false;
	}
	var sr=size/2,sc=size/2,er=size,ec=size;
	if(x<size/2)
	{
		sr=0;
		er=size/2;
	}
	if(y<size/2)
	{
		sc=0;
		ec=size/2;
	}
	// console.log(x,y,digit);
	var fr=new Array(size+1);
	for(var i=0;i<=size;i++)
		fr[i]=0;
	for(var i=sr;i<er;i++)
	{
		for(var j=sc;j<ec;j++)
		{
			fr[arr[i][j]]++;
			if(fr[arr[i][j]]>1&&arr[i][j]!=0)
				ans=false;
		}
	}
	// console.log(fr);
	// console.log(ans);
	return ans;
}
function generate()
{
	var cnt=0;
	initialise();
	solver();
	var dis=new Array(size*size);
	for(var i=0;i<size*size;i++)
		dis[i]=i;
	var last=size*size,cnt=2*size;
	while(cnt--)
	{
		var temp=Math.floor(Math.random()*last);
		var current=dis[temp];
		var temp2=dis[last-1];
		dis[last-1]=current;
		dis[temp]=temp2;
		last--;
		var x=Math.floor(current/size),y=current-size*x;
		inp[current].value=arr[x][y];
		inp[current].disabled=true;
	}
	console.log(arr);

}
reset.addEventListener("click",function(){
	initialise();
	generate();

})
initialise();
generate();