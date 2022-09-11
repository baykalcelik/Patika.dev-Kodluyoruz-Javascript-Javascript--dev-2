



        let eklenecek = document.getElementById('task'); // kullanıcı girişi yapılan texti içeren inputa ulaşım için değişken atandı.

        let liveToastError = document.getElementById('liveToastError'); // kullanıcı veri girişi uyarı mesajları için, mesaj divlerine değişken atandı.
        let liveToastOK = document.getElementById('liveToastOK');


        // todo itemlarının ekleneceği html list elementine erişim için değişken atandı.
        let liste = document.getElementById('list');



        // sayfa açılırken localStorage içindeki değerler okundu ve listeye eklendi.
        window.onload=function(){
            for(let x = 0; x < localStorage.length; x++){ //localstorage içindeki bütün itemlar tek tek kontrol edildi.
                if(localStorage.key(x).includes('todoappitem')){ // eğer key değeri bizim özellikle eklediğimiz todoappitem kelimesini içeriyorsa işleme alındı.

                    let yeniyapilacak = document.createElement('li'); // localStorageden çekilen bilginin ul içine eklenmesi için kapsayıcı olan li etiketi oluşturuldu.

                    yeniyapilacak.addEventListener('click', tamamlandi); // tıklanma durumunda çalışacak tamamlandi fonksiyonu eklendi.


                    // localStoragedan gelen value içinde (bitti) yazısının olup olmadığına bakıldı. Bu bilgi görevin yapıldığı bilgisi için konuldu. eğer bitti varsa li ye classname olarak checked eklendi. Bu class görevin bitirilmiş olduğunu gösteren css ayarlarını li üzerine uyguluyor.
                    if(localStorage.getItem(localStorage.key(x)).includes("bitti")) {yeniyapilacak.classList.add("checked")}


                    // localStoragedan gelen value değeri li içine innerText olarak verildi. ancak (bitti) yazısı bizim atadığımız bir text olduğu için eğer varsa yazıdan çıkarıldı. Ekranda bu ek yazının gözükmesine gerek yok.
                    if(localStorage.getItem(localStorage.key(x)).includes("bitti")) {
                        yeniyapilacak.innerHTML = localStorage.getItem(localStorage.key(x)).replace("(bitti)","");
                    }else{
                        yeniyapilacak.innerHTML = localStorage.getItem(localStorage.key(x));
                    }

                    
                    

                    let btn = document.createElement('button'); // silme butonu yaratıldı.
                    btn.classList.add('deleteBtn'); // butona deleteBtn class'ı eklendi ve css ayarlandı.
                    btn.addEventListener('click', silebilirsin); // butona tıklanması durumunda çalıştırılacak silebilirsin fonksiyonu eklendi.

                    // deleteBtn içine close simgesi bootstrap ikonlarından alındı.
                    let ikon = document.createElement('i');
                    ikon.innerHTML = `<i class="bi bi-x-lg"></i>`;
                    btn.appendChild(ikon); // ikon buton içine append edildi.

                    yeniyapilacak.appendChild(btn); // buton li elementi içine append edildi.

                    liste.appendChild(yeniyapilacak);  // li elementi  liste içine append edildi.


                }   
                
                
            }
        
        }

        function getRandomId(){   // yeni görev kaydı yapılırken localStoragede kayıt adlarının farklılığını sağlayabilmek için eklenen id numarasını rastgele oluşturan fonksiyon
            return Math.floor(Math.random() * 1000000);
        }

        function newElement(){    // ekleme butonuna basılınca çalışan fonksiyon

            if(eklenecek.value == "" || eklenecek.value.trim().length < 1){ // kullanıcı tarafından yazılan text kontrol edildi. Eğer boş giriş yapıldıysa bootstrap Toast hata mesajı ekranın sağ üst köşesine çıkartıldı.
                $('#liveToastError').toast('show');
            }else { 

                // eğer kullanıcı girişi doğruysa ilk olarak localstorage içine kayıt yapıldı. diğer kayıtlardan ayırabilmek için todoappitem kelimesi key içine eklendi. ayrıca key'in uniqe olması için random id de eklendi.
                localStorage.setItem('todoappitem'+getRandomId(), eklenecek.value);

                // listeye eklenecek, herşeyi kapsayacak li elementi yaratıldı.
                let yeniyapilacak = document.createElement('li');
                yeniyapilacak.addEventListener('click', tamamlandi); // görev tamamlama fonksiyonu eklendi.
                yeniyapilacak.innerHTML = eklenecek.value;  // kullanıcı tarafından input içine yazılan text innerHTML ile li içine atandı.


                // silme butonu yaratıldı.
                let btn = document.createElement('button');
                btn.classList.add('deleteBtn'); // silme butonuna deleteBtn class'ı atandı
                btn.addEventListener('click', silebilirsin); // silme işlemini yapacak olan silebilirsin fonksiyonu click eventlistener'ına eklendi.

                // deleteBtn içine close buton simgesi eklendi.
                let ikon = document.createElement('i');
                ikon.innerHTML = `<i class="bi bi-x-lg"></i>`;
                btn.appendChild(ikon);

                // li içine buton atıldı.
                yeniyapilacak.appendChild(btn);

                // ana liste içine yaratılan li elementi eklendi. 
                liste.appendChild(yeniyapilacak);

                // kullanıcı giriş input'unun içindeki yazı kaldırıldı.
                eklenecek.value = "";

                // bootstrap toast kullanılarak kayıt yapıldığına dair uyarı sağ üstte gösterildi.
                $('#liveToastOK').toast('show');
            
            
            
            
            }
        } // fonksiyon sonu






        function tamamlandi(e){

            if(e.target.classList.contains("checked")){ // tıklanan li elementi üzerinde checked class'ı varmı bakıldı.

                e.target.classList.remove("checked"); // eğer varsa checked kaldırıldı. böylece li elemanının css özellikleri ilk hale döndü.

                // tıklanan li elementi üzerindeki  yazı yani innerText alındı.
                let deger = e.target.innerText.trim();

                // for döngüsü ile localstoragedaki tüm elemanlara tek tek bakıldı.
                for(let x = 0; x < localStorage.length; x++){
                
                // her adımda ilk olarak o sıradaki key getirildi.
                let bulunankey = localStorage.key(x);
                
                // gelen key'in bizim kaydettiğimiz key olup olmadığını görmek için içinde todoappitem kelimesinin olup olmadığına bakıldı. 
                if(bulunankey.includes('todoappitem')){

                    // eğer bizim eklediğimiz key-value çifti ise localstoragedan value değeri alındı. ve alınırken sonundaki (bitti) yazısı replace ile çıkartıldı.
                    let bulunanValue = localStorage.getItem(bulunankey).replace("(bitti)","");
                    
                    // şimdi de localstoragedan gelen value ile tıklanan li elementi üzerindeki innerText değerinin aynı olup olmadığı kontrol edildi. Çünkü bizim değişiklik yapacağımız kayıt bu kayıt olacak.
                    if( bulunanValue === deger){
                        //eğer doğru kayıtsa localstoragedaki kayıt güncellendi. ve (bitti) yazısı valuedan çıkartılmış hali tekrar kayıtedildi.
                        localStorage.setItem(bulunankey, bulunanValue );
                    }
                }



                } // for döngü end



            }else{


                 // tıklanan li elementi üzerindeki  yazı yani innerText alındı.
                let deger = e.target.innerText.trim();

                // for döngüsü ile localstoragedaki tüm elemanlara tek tek bakıldı.
                for(let x = 0; x < localStorage.length; x++){
                    
                    // her adımda ilk olarak o sıradaki key getirildi.
                    let bulunankey = localStorage.key(x);


                     // gelen key'in bizim kaydettiğimiz key olup olmadığını görmek için içinde todoappitem kelimesinin olup olmadığına bakıldı. 
                    if(bulunankey.includes('todoappitem')){

                        // localstoragedan value değeri çekildi.
                        let bulunanValue = localStorage.getItem(bulunankey).trim();

                        // value ile li elementinden gelen innerText değerinin aynı olup olmadığı kontrol edildi.
                        if( bulunanValue === deger){

                            // eğer aynı ise value'nın sonuna (bitti) kelimesi eklendi
                            localStorage.setItem(bulunankey, bulunanValue + "(bitti)");
                        }
                    }

                    // li elementine checked class'ı eklendi
                    e.target.classList.add("checked");
                }

            }

        }















        function silebilirsin(e){

            // stopPropagation ile bubbling engellendi.
            e.stopPropagation();
            e.preventDefault();

            // li elementi üzerindeki değer alındı.
            let deger = e.target.parentNode.innerText.trim();

            // for döngüsü ile localstoragedaki tüm elemanlara tek tek bakıldı.
            for(let x = 0; x < localStorage.length; x++){

                // her adımda ilk olarak o sıradaki key getirildi.
                let bulunankey = localStorage.key(x);
                

                // gelen key'in bizim kaydettiğimiz key olup olmadığını görmek için içinde todoappitem kelimesinin olup olmadığına bakıldı. 
                if(bulunankey.includes('todoappitem')){

                     // localstoragedan value değeri çekildi.
                    let bulunanValue = localStorage.getItem(bulunankey).replace("(bitti)","");
                    
                    // value ile li elementinden gelen innerText değerinin aynı olup olmadığı kontrol edildi.
                    if( bulunanValue === deger){


                        // eğer aynı ise localstoragedan kayıt silindi.
                        localStorage.removeItem(bulunankey);
                    }
                }



            } // for döngü end


            e.target.parentNode.remove(); // ekranda - listenin içinden li elementi silindi.

        }


      