export async function login ({username, password}){
    return new Promise((resoive,reject)=>{
        setTimeout(() => {
            if (username==='shakil' && password === 'shakil') {
                resoive();
                console.log('hello');
            }else{
                reject();
            }
        }, 1000);
    })
}