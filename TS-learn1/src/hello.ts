function Greet (name:string):string{
    return `hello${name}`
}

console.log(Greet("Nischal"));

//union

const hello : number|string = "12"

type Human = {
    hasLegs:boolean;
    canBreather:boolean
}


type User ={
    name:String;
     age:number;
}
//intersection  
type Nischal = Human & User;

const hey:Nischal={
    hasLegs :true,
    canBreather :true,
    name:"Nischal",
    age:12
}



