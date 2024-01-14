function makeSomething(a,b={c:undefined,d:undefined}){
    console.log('a',a);
    console.log('b',b);
    console.log('c',b.c);
    console.log('d',b.d);
}
makeSomething()