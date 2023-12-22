// get Markup Element
let theTitle=document.getElementById("title");
let thePrice=document.getElementById("price");
let theTaxes=document.getElementById("taxes");
let theAds=document.getElementById("ads");
let theTotal=document.querySelector("small");
let theCounter=document.getElementById("count");
let theCategory=document.getElementById("category");
let theCreateProduct=document.getElementById("create");
let clearAll=document.getElementById("clearData");
let theSearch=document.getElementById("search");
let theSearchTitle=document.getElementById("searchTitle");
let theSearchCategory=document.getElementById("searchCategoey");
let theTable=document.querySelector("table");
let theTableBody=document.querySelector("table tbody");
let darkMode=document.getElementById("dark");
let theOutputs=document.querySelector(".outputs");
{// Dark Mode Function
    // darkMode.onclick=function () {
    //     let ele=document.body;
    //     ele.classList.toggle("bg-body");
    //     theCreateProduct.classList.toggle("bg-blue");
    //     clearAll.classList.toggle("bg-blue");
    //     theSearchTitle.classList.toggle("bg-blue");
    //     theSearchCategory.classList.toggle("bg-blue");
    //     theTotal.classList.toggle("bg-blue");
    //     darkMode.style.background='#4190e0';
    //     darkMode.style.color='white';
    // };
}

darkMode.onclick=function () {
    let elementsToToggle=[document.body, theOutputs];
    elementsToToggle.forEach((element) => element.classList.toggle("bg-blue"));
    darkMode.style.background='#333';
    darkMode.style.color='FFF';
    document.body.style.background="#FFF";
};
let mode="create";
// المتغير الوهمي
let temp;

// Make Array To Store Data (Title,Price,Ads,Taxes,Total,categroy)
let productData;
if(window.localStorage.getItem("Product")!==null) {
    productData=JSON.parse(window.localStorage.getItem("Product"));
} else {
    productData=[];
}


// Creation Function
theCreateProduct.onclick=function () {
    let DataObj={
        title: theTitle.value,
        price: thePrice.value,
        taxes: theTaxes.value,
        ads: theAds.value,
        total: +thePrice.value+ +theTaxes.value+ +theAds.value,
        count: theCounter.value,
        category: theCategory.value,
    };
    // Ensure productData is initialized as an array
    productData=productData||[];
    // Counter Function
    if(mode=="create") {
        if(theCounter.value>1) {
            for(let i=0; i<theCounter.value; i++) {
                // Add Object To Array
                productData.push(DataObj);
            }
        } else {
            // Add Object To Array
            productData.push(DataObj);
        }
    } else {
        productData[temp]=DataObj;
        mode="create";
        theCreateProduct.innerHTML='Create Product';
        theCounter.style.display="block";
        clearInput();
    }
    // Local Storage take on String No take Array As Array Is Object And To Convert Array To Sting We Can Use JSON.Stringify
    window.localStorage.setItem("Product", JSON.stringify(productData));
    // Total Function
    getTotal();
    // Product function
    Products();
};

// Function that Appear The Total Price Before Creating The Product
thePrice.onkeyup=function () {
    getTotal();
};
theTaxes.onkeyup=function () {
    getTotal();
};
theAds.onkeyup=function () {
    getTotal();
};
theCounter.onkeyup=function () {
    getTotal();
};
// Get Total Price
function getTotal () {
    if(thePrice.value=="") {
        return false;
    } else if(theCounter.value==0) {
        let theTotalValue=Number(thePrice.value)+Number(theTaxes.value)+Number(theAds.value);
        theTotal.innerHTML=theTotalValue;
    } else {
        let theTotalValue=Number(thePrice.value)+Number(theTaxes.value)+Number(theAds.value);
        theTotal.innerHTML=theTotalValue*theCounter.value;
    }
}

// Clear Inputs
function clearInput () {
    theTitle.value="";
    thePrice.value="";
    theTaxes.value="";
    theAds.value="";
    theCategory.value="";
    theCounter.value="";
    theTotal.innerHTML="";
}

// Clear All Inputs Values
clearAll.addEventListener('click', function () {
    clearInput();
});

// Read Product
function Products () {
    let tableBody='';
    if(productData&&productData.length>0) {
        for(let i=0; i<productData.length; i++) {
            tableBody+=`
            <tr>
                <td>${i}</td>
                <td>${productData[i].title}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].total}</td>
                <td>${productData[i].category}</td>
                <td><button class="btn" id="btn1" onclick="UpdataData(${i})">Update</td>
                <td><button class="btn" id="btn2" onclick="clearProduct (${i})">Delete</td>
            </tr>
        `;
        }
    }

    productData=JSON.parse(window.localStorage.getItem("Product"));
    document.getElementById("tbody").innerHTML=tableBody;
    // // Get The DeletedAll Html Element
    let deletedAll=document.querySelector(".deletedAll");
    // Clear All Products
    if(productData&&productData.length>0) {
        deletedAll.innerHTML=`
            <button id="deletedAll" class="btn deleteValues" onclick="deletedAllProducts()">Delete All Products[${productData.length}]</button>
        `;
    } else {
        deletedAll.innerHTML='';
    }

}

// To Make Product Still In The Page After Reload the page
Products();

// Clear Product
function clearProduct (index) {
    productData.splice(index, 1);
    window.localStorage.setItem("Product", JSON.stringify(productData));
    Products();
}

// Delete All Products
function deletedAllProducts () {
    productData.splice(0, productData.length);
    window.localStorage.setItem("Product", JSON.stringify(productData));
    Products();
}
// Update Function
// Update Function
function UpdataData (index) {
    theTitle.value=productData[index].title;
    thePrice.value=productData[index].price;
    theTaxes.value=productData[index].taxes;
    theAds.value=productData[index].ads;
    theTotal.value=getTotal();
    theCounter.style.display="none";
    theCategory.value=productData[index].category;
    theCreateProduct.innerHTML="Update Product Data";
    mode="update";
    temp=index;
    scrollTo(top);
}

// Search Mode
// Search In Products
let searchType="title";

function searchMode (id) {
    if(id=='searchTitle') {
        searchType="title";
        theSearch.placeholder="Search By Title";
    } else {
        searchType='category';
        theSearch.placeholder="Search By Category";
    }
    theSearch.focus();
    Products();
}

theSearchCategory.onclick=function (id) {
    searchMode(this.id);
};

theSearchTitle.onclick=function (id) {
    searchMode(this.id);
};


function searchBy (value) {
    let tableBody='';
    for(let i=0; i<productData.length; i++) {
        if(searchType==='title') {
            if(productData[i].title.includes(value)) {
                tableBody+=`
                    <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button class="btn" id="btn1" onclick="UpdataData(${i})">Update</td>
                        <td><button class="btn" id="btn2" onclick="clearProduct (${i})">Delete</td>
                    </tr>
                `;
            }
        } else {
            if(productData[i].category.includes(value)) {
                tableBody+=`
                    <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button class="btn" id="btn1" onclick="UpdataData(${i})">Update</td>
                        <td><button class="btn" id="btn2" onclick="clearProduct (${i})">Delete</td>
                    </tr>
                `;
            }
        }
    }

    document.getElementById("tbody").innerHTML=tableBody;
}

function searchMode (id) {
    if(id==='searchTitle') {
        searchType="title";
        theSearch.placeholder="Search By Title";
    } else {
        searchType='category';
        theSearch.placeholder="Search By Category";
    }
    theSearch.focus();
    Products();
}

theSearchCategory.onclick=function () {
    searchMode(this.id);
};

theSearchTitle.onclick=function () {
    searchMode(this.id);
};

theSearch.onkeyup=function () {
    searchBy(this.value);
};


theSearch.onkeyup=function (value) {
    searchBy(this.value);
};
