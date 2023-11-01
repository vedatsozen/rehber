let people = [];

// Sayfa yüklendiğinde localStorage'dan kişileri al
let localStorageData = localStorage.getItem("people");

// localStorage'da veri varsa, onu people dizisine atayın
if (localStorageData) {
  people = JSON.parse(localStorageData);
}

$(document).ready(function() {

  $(".close").click(function(){
    $("#personinput").hide();

  })

  $("#personinput").hide();
  $("#sonucdiv").hide();

  $(".addnew").click(function() {
    $("#personinput").show();
    $("#sonucdiv").hide();
  });

  $(".add").click(function() {

    $("#sonucdiv").hide();
 
    let ad = document.getElementById("ad").value;
    let soyad = document.getElementById("soyad").value;
    let telno = document.getElementById("telno").value;

    if (!ad || !soyad || !telno) {
        alert("Lütfen eksikleri doldurunuz");
        return
    }

 
    // Yeni bir kişi objesi oluştur
    let yeniKisi = {
      ad: ad,
      soyad: soyad,
      telno: telno
    };

    // Kişiyi people dizisine ekle
    people.push(yeniKisi);

     // Kişileri localStorage'da sakla
     localStorage.setItem("people", JSON.stringify(people));

    // Ekleme işlemi tamamlandığında gizleme
    $("#personinput").hide();

    // Formu temizle
    document.getElementById("ad").value = "";
    document.getElementById("soyad").value = "";
    document.getElementById("telno").value = "";
  });
  
});

  function kisiyibul() {

    let aranankisi = document.getElementById("searchinput").value;

    let sonucDiv = document.getElementById("kisiListesi");

    if ( aranankisi == "") {
        sonucDiv.style.visibility = "hidden";
    }

    else {

    sonucDiv.style.visibility = "visible";

    };

    sonucDiv.innerHTML = "";

    // Kişileri ad içeriği eşleşen şekilde listele
    for (let i = 0; i < people.length; i++) {
      if (people[i].ad.includes(aranankisi)) {
        let kisiLi = document.createElement("li");
        kisiLi.innerHTML = people[i].ad + " " + people[i].soyad + " " + people[i].telno;

         // Sil ikonunu ekleyin ve kisisil sınıfını verin
         let silIkon = document.createElement("i");
         silIkon.className = "bi bi-trash3 kisisil";
         silIkon.addEventListener("click", function() {
           kisiSil(i);
         });

         kisiLi.appendChild(silIkon);
        sonucDiv.appendChild(kisiLi);
      }
    }

    if (sonucDiv.children.length === 0) {
      let hataLi = document.createElement("li");
      hataLi.innerHTML = "Rehberde aradığınız kişi bulunamadı.";
      sonucDiv.appendChild(hataLi);
    }

    $("#sonucdiv").show();

  }


  function kisiSil(index) {
    // Kişiyi diziden ve localStorage'dan kaldır
    people.splice(index, 1);
    localStorage.setItem("people", JSON.stringify(people));
  
    // Görüntülenen kişiyi de sayfadan kaldır
    let sonucDiv = document.getElementById("kisiListesi");
    sonucDiv.removeChild(sonucDiv.childNodes[index]);
  
    if (people.length === 0 ) {
      // Eğer kişi kalmadıysa sonucdiv'i gizle
      sonucDiv.style.visibility = "hidden";
    }
  }



function tumliste() {

    let sonucDiv = document.getElementById("kisiListesi");
    
    sonucDiv.style.visibility = "visible";

    sonucDiv.innerHTML = "";

    // Kişileri ad içeriği eşleşen şekilde listele
    for (let i = 0; i < people.length; i++) {

        let kisiLi = document.createElement("li");

        kisiLi.innerHTML = people[i].ad + " " + people[i].soyad + " " + people[i].telno;

         // Sil ikonunu ekleyin ve kisisil sınıfını verin
         let silIkon = document.createElement("i");
         silIkon.className = "bi bi-trash3 kisisil";
         silIkon.addEventListener("click", function() {
           kisiSil(i);
         });

         kisiLi.appendChild(silIkon);

        sonucDiv.appendChild(kisiLi);
      }

    if (sonucDiv.children.length === 0) {
      let hataLi = document.createElement("li");
      hataLi.innerHTML = "Rehberde aradığınız kişi bulunamadı.";
      sonucDiv.appendChild(hataLi);
    }

    $("#sonucdiv").show();

  }


