const menuBar = document.querySelector(
    ".bridal-lash-wrapper >div:nth-child(3)",
);
const ToSlideLeft = document.querySelector(".bridal-lash-wrapper>nav ");
const links = document.querySelectorAll(".bridal-lash-wrapper>nav>li>a");
const mediaQuery = window.matchMedia("(max-width:1200px)");
let found = false;
function handleMediaQuery(e) {
    if (e.matches === true) {
        menuBar.addEventListener("click", () => {
            found = !found;
            if (found === true) {
                ToSlideLeft.style.left = "-10%";
                ToSlideLeft.style.transition = "0.7s";
            } else if (found == false) {
                ToSlideLeft.style.left = "-100%";
                ToSlideLeft.style.transition = "1s";
            }
        });
        links.forEach((el) => {
            el.addEventListener("click", () => {
                found = !found;
                ToSlideLeft.style.left = "-100%";
                ToSlideLeft.style.transition = "1s";
            });
        });
    }
}

handleMediaQuery(mediaQuery);
mediaQuery.addEventListener("change", handleMediaQuery);

//  section navigate
links.forEach((el) => {
    el.addEventListener("click", () => {
        document
            .querySelectorAll(".bridal-lash-wrapper>nav>li>a")
            .forEach((el) => (el.style.color = "#ffffff"));
        el.style.color = "#f9c352";
        el.style.transition = "0.4s";
    });
});

function loadjson() {
    // Create a XHR Object
    const xhr = new XMLHttpRequest();

    // open
    xhr.open("GET", "data.json", true);

    xhr.onload = function () {
        if (this.status === 200) {
            const customer = JSON.parse(this.responseText);

            var changeable = document.querySelector("#changeable");

            let output = "";
            customer[0].forEach((el) => {
                output += ` <div  data-aos="zoom-in-up"  data-aos-delay="100"  data-aos-duration="900">
                                   <div>
                                       <img width="100%" height="100%"  src=${el.img}   alt="high definition makeup package">
                                   </div>
                                   <h3>${el.name}</h3>
                                   <div>
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="rgba(249,195,82,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
                                       <span  class="price">${el.price}</span>
                                   </div>
                                   <button class="addToList">ADD TO LIST</button>
                                  
                               </div>`;
            });
            changeable.innerHTML = output;

            var parsedItem2 = document.querySelector("#changeCustomize");
            let output1 = "";
            customer[1].forEach((el) => {
                output1 += ` <div  data-aos="zoom-in-up"  data-aos-delay="100"  data-aos-duration="900">
                          <div>
                              <img width="100%" height="100%"  src=${el.img}   alt="high definition makeup package">
                          </div>
                          <h3>${el.name}</h3>
                          <div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="rgba(249,195,82,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
                              <span  class="price">${el.price}</span>
                          </div>
                          <button class="addToList">ADD TO LIST</button>
                         
                      </div>`;
            });
            parsedItem2.innerHTML = output1;
        }
    };

    xhr.send();
}

loadjson();

// ItemCtrl
const ItemCtrl = (function () {
    const item = function (id, img, title, price, quantity = 1) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    };
    const data = {
        items: [],
        totalMoney: 0,
    };
    return {
        getItem: function () {
            return data;
        },
        setItem: function (title, price, img) {
            let Id;
            if (data.items.length > 0) {
                Id = data.items[data.items.length - 1].id + 1;
            } else {
                Id = 0;
            }
            const added = new item(Id, img, title, price);
            let exists = false;

            for (let i = 0; i < data.items.length; i++) {
                if (data.items[i].img === added.img) {
                    exists = true; // Mark as found if an item with the same img exists
                    break; // Stop the loop once a match is found
                }
            }

            if (!exists) {
                data.items.push(added); // Add the new item if no match was found
            }
        },
        removeItem: function (id) {
            // Find the index of the item to remove
            const index = data.items.findIndex((item) => item.id === id);

            // Check if the index is valid
            if (index !== -1) {
                data.items.splice(index, 1);
            } else {
                return;
            }
            this.moneyUpdate();
        },
        moneyUpdate: function () {
            let money = 0;

            if (data.items.length > 0) {
                data.items.forEach((el) => {
                    var toChange1 = el.price;
                    var price = parseInt(toChange1);
                    money += price * el.quantity;
                });

                return (data.totalMoney = money);
            }
        },
        updateQuantity: function (id, newQuantity) {
            const item = data.items.find((el) => el.id === id);
            if (item) {
                item.quantity = newQuantity;
                this.moneyUpdate();
            }
        },
    };
})();

// UI control

const UICtrl = (function () {
    return {
        UITotalMoney: function (data) {
            document.querySelector(".amount").innerText = data.totalMoney;
        },
        UIAddItem: function (title, price, img, data) {
            let Id;
            data.items.forEach((el) => {
                Id = el.id;
            });

            const div = document.createElement("div");
            div.id = `item-${Id}`;
            div.innerHTML = `
                                   
                                    <div>
                                      <img width="100%" height="100%" src=${img} alt="">
                                  </div>
                                  <div>
                                      <div>
                                          <h4>${title}</h4>
                                          <div>
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="rgba(249,195,82,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path></svg>
                                              <span>${price}</span>
                                          </div>
                                      </div>
                                      <div>
                                          <div>
                                              <svg class="minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                                              <span class="quantity">1</span>
                                              <svg class="plus"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                          </div>
                                          <span class="remove">Remove</span>
                                      </div>
              
                                  </div>
                              `;
            document.querySelector(".list-wrapper").appendChild(div);
        },
        UIRemoveItem: function (idnum) {
            document.querySelectorAll(".list-wrapper >div").forEach((el) => {
                if (el.id === `item-${idnum}`) {
                    el.remove();
                }
            });
        },
        alertshow: function () {
            var alert = document.querySelector(".alert");
            alert.style.display = "flex";
            setTimeout(() => {
                alert.style.display = "none";
            }, 2000);
        },
        alertdanger: function (bg, bl, text, color) {
            document.querySelector(".alert").style.backgroundColor = bg;
            document.querySelector(".alert").style.borderLeft = bl;
            document.querySelector(".msg").innerText = text;
            document.querySelector(".alert>div >svg:nth-child(1) ").style.color = color;
            document.querySelector(".alert>div>div >svg:nth-child(1)").style.color = color;
        },
        alertSuccess: function (bg, bl, text, color) {
            document.querySelector(".alert").style.backgroundColor = bg;
            document.querySelector(".alert").style.borderLeft = bl;
            document.querySelector(".msg").innerText = text;
            document.querySelector(".alert>div >svg:nth-child(1) ").style.color =
                color;
            document.querySelector(".alert>div>div >svg:nth-child(1)").style.color =
                color;
        },
        showsection: function () {
            document.querySelector(".list").style.display = "block";
        },
        hidesection: function (data) {
            if (data.items.length === 0) {
                document.querySelector(".list").style.display = "none";
            }
        },
        whatsappSection: function (data) {
            let contactNumber = "919940302644";
            let combinedMessage = `Hello, I've just made an enquiry on your Bridal Lash Website \n\n`;

            data.items.forEach((el, index) => {
                // Create the message for each item with numbering for clarity
                const message = `${index + 1})${el.title}\n   Price:${el.price}\n   Quantity:${el.quantity}\n\n`;
                // Combine each message into one big message
                combinedMessage += message;
            });
            combinedMessage += `Total:${data.totalMoney}\n\n`;
            // Encode the combined message and update the WhatsApp link
            const url = `https://wa.me/${contactNumber}?text=${encodeURIComponent(combinedMessage)}`;
            document.getElementById("whatsapp-share").href = url;
        },
    };
})();

// App Control

const AppCtrl = (function () {
    function loadEventListener() {
        // event for add to list btn
        document.querySelectorAll("section").forEach((el) => {
            el.addEventListener("click", (e) => {
                if (e.target.className === "addToList") {
                    const title = e.target.parentElement.children[1].innerText;
                    const UIprice = e.target.parentElement.children[2].innerText;
                    const img = e.target.parentElement.children[0].children[0].getAttribute("src");
                    const check = ItemCtrl.getItem();
                    const perfect = check.items;
                    let exist = false
                    perfect.some(item => {
                        if (item.title === title && item.img === img && item.price === UIprice) {
                            exist = true
                        }
                    })

                    if (!exist) {
                        ItemCtrl.setItem(title, UIprice, img);
                        ItemCtrl.moneyUpdate();
                        UICtrl.UITotalMoney(ItemCtrl.getItem());
                        UICtrl.UIAddItem(title, UIprice, img, ItemCtrl.getItem());
                        UICtrl.alertSuccess(
                            "#d4edda",
                            "8px solid #28a745",
                            "Added successfully!",
                            "#28a745"
                        );
                        UICtrl.alertshow();
                        UICtrl.showsection();
                    }
                }
            });
        });

        // event for removebtn
        document.addEventListener("DOMContentLoaded", function () {
            const removebtn = document.querySelector(".list-wrapper");

            removebtn.addEventListener("click", (e) => {
                if (e.target.className === "remove") {
                    var UiId = e.target.parentElement.parentElement.parentElement.id;
                    let stringNumber = UiId.split("-");
                    let IdNumber = parseInt(stringNumber[1]);
                    ItemCtrl.removeItem(IdNumber);
                    UICtrl.UIRemoveItem(IdNumber);
                    ItemCtrl.moneyUpdate();
                    UICtrl.UITotalMoney(ItemCtrl.getItem());
                    UICtrl.alertdanger(
                        "#ffcccb",
                        "8px solid red",
                        "Deleted sucessful!y",
                        "red",
                    );
                    UICtrl.alertshow();
                    UICtrl.hidesection(ItemCtrl.getItem());
                }

                //    event for Quantity Plus and Minus
                if (
                    e.target.className.baseVal === "minus" &&
                    parseInt(e.target.parentElement.children[1].innerText) > 1
                ) {
                    let val = parseInt(e.target.parentElement.children[1].innerText);
                    val -= 1;
                    var UiId =
                        e.target.parentElement.parentElement.parentElement.parentElement.id;
                    let stringNumber = UiId.split("-");
                    let IdNumber = parseInt(stringNumber[1]);
                    ItemCtrl.updateQuantity(IdNumber, val);
                    e.target.parentElement.children[1].innerText = val;
                    UICtrl.UITotalMoney(ItemCtrl.getItem());
                    var checking = ItemCtrl.getItem();
                    checking.items.forEach((el) => {
                        if (el.id === IdNumber) {
                            e.target.parentElement.parentElement.parentElement.children[0].children[1].children[1].innerText =
                                el.price * val;
                        }
                    });
                } else if (e.target.className.baseVal === "plus") {
                    let val = parseInt(e.target.parentElement.children[1].innerText);
                    val += 1;
                    var UiId =
                        e.target.parentElement.parentElement.parentElement.parentElement.id;
                    let stringNumber = UiId.split("-");
                    let IdNumber = parseInt(stringNumber[1]);
                    ItemCtrl.updateQuantity(IdNumber, val);
                    e.target.parentElement.children[1].innerText = val;
                    UICtrl.UITotalMoney(ItemCtrl.getItem());
                    var checking = ItemCtrl.getItem();
                    checking.items.forEach((el) => {
                        if (el.id === IdNumber) {
                            e.target.parentElement.parentElement.parentElement.children[0].children[1].children[1].innerText =
                                el.price * val;
                        }
                    });
                }
            });
        });

        // event for Alert -hide
        document
            .querySelector(".alert>div >svg:nth-child(1)")
            .addEventListener("click", () => {
                var alert = document.querySelector(".alert");
                alert.style.display = "none";
            });

        // event for whatsapp
        document.querySelector("#whatsapp-share").addEventListener("click", () => {
            UICtrl.whatsappSection(ItemCtrl.getItem());
        });

        // event for Arrow
        document.querySelector(".arrow").addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        });
    }

    return {
        start: function () {
            loadEventListener();
        },
    };
})();

AppCtrl.start();

AOS.init();

