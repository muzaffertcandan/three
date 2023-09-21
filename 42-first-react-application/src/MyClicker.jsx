import { useState, useEffect } from "react";

export default function MyClicker({ keyName, keyColor= "blue"}) {
  //reactive data ile çalışmak
    console.log("props keyname", keyName)
    console.log(keyColor);
  /* 
    Kolay yol
    */

    // normalde useState içine 0 yazabilirdik ancak sayfanın tekrar renderlanmaması için
    // local storage dan item çekilmesini yazdık bu sayede use efectin içinde tekrar renderlanmıyor
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));

  /* 
    Saving the LOCAL STORAGE
   */

  useEffect(() => {
    //local storage dan çekmek için
    //nullish coalising operator yani ?? budur null kontrolü için gereklidir
    // soru işaretlerinden sonra "0" rakamını koyarsak
    // null olduğunda 0 kabul et anlamına gelir
    // const savedCount = parseInt(localStorage.getItem("count") ?? 0);
    return()=>{
      localStorage.removeItem(keyName)
    }
}, []);
  // [] bize ne zaman çağıracağımızı söyler first renderda gelmesini istiyorsak
  // [] şeklinde boş array yapabiliriz, state değiştiğinde gelmesini istiyorsak,
  // hangi datanın değiştiğinde gelmesini istiyorsak onu [MYSTATE] şeklinde yerleştiriyoruz
  useEffect(() => {
    //local storage kaydı için = send to local storage
    localStorage.setItem(keyName, count);
  }, [count]);

  /* 
   Kolay yol bitiş
   */

   /*
   Component kaldırıldığında local storage temizleme
   */

  //use state bir değişken ve bir setter fonksiyonu saklar
  // const countState = useState(0)
  // const count = countState[0]

  //setter function setCount burada
  // const setCount = countState[1]

  const buttonClick = () => {
    // 1.yol
    setCount(count + 1);

    // 2.yol bu yol bize anlık value ile çalıştığımızdan emin olmamızı sağlıyor
    // setCount((value) => value + 1);
  };

  return (
    <>
      <div>
        <div style={{backgroundColor: keyColor}}>Click count: {count} </div>
        <button onClick={buttonClick}>Click here</button>
      </div>
    </>
  );
}
