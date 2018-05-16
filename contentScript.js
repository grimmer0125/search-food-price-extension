console.log("in contentScript");
console.log("current page url:", window.location.href);

const apiServer = "http://localhost:8080/rpc";
const carrefourStoreURL = "online.carrefour.com.tw";
const sbdStoreURL = "sbd-ec.wellcome.com.tw";
const currentPage = window.location.href;

let productName = null;
let promotionPrice = null;

if (currentPage.indexOf(carrefourStoreURL)>-1) {

    const productNameUI = document.querySelector(".pro-name");
    if (productNameUI) {
        productName = productNameUI.innerHTML;
    }

    const priceUI = document.querySelector(".pro-price");
    // let origPrice = priceUI.querySelector(".line-through").innerHTML; //$51
    // origPrice = origPrice.substring(1, origPrice.length);
    if (priceUI) {
        promotionPrice = priceUI.querySelector(".red").innerHTML; //$49
        promotionPrice = promotionPrice.substring(1, promotionPrice.length);
    }

} else if (currentPage.indexOf(sbdStoreURL)>-1) {
    console.log("in sbdStoreURL site !!!!");
    const productNameUI = document.querySelector(".product-name");
    if (productNameUI) {
        productName = productNameUI.innerHTML;
    }
    console.log("sbd product:", productName);

    const priceUI = document.querySelector(".product-price-container");
    if (priceUI) {
        // alternative ways:
        // https://stackoverflow.com/questions/16981134/how-to-get-text-of-element-but-excluding-a-child-of-that-element
        // .nextSibling.nodeValue or .removeChild
        promotionPrice = priceUI.querySelector(".item-price").textContent; //$49

        promotionPrice = promotionPrice.substring(1, promotionPrice.length);
    }

    console.log("sbd price:", promotionPrice);

    // TODO: since honestbee doest not have sbdStore products yet,
    // so does not query it
    promotionPrice = null;
}

if (productName && promotionPrice) {

    console.log("query product name:", productName);
    console.log("product price:", promotionPrice);

    // RPC like API
    const body = {
        method: "queryProduct",
        params: {
            store: "carrefour",
            productName,
            shownPrice: promotionPrice,
            sourceURL: currentPage // notify internal staff when honestbee price is not cheaper
        }
    };
    fetch(apiServer, {
        method: 'POST',
        body:JSON.stringify(body),
    })
    .then(res => {
        return res.json();// text();
    }).then(json => {
        console.log("try to udpate UI:", json);
        //TODO compare with promotionPrice
        //if (json.Price && json.Price < promotionPrice) {
        if (json.Price) {
            // OK: update UI, e.g.
            var a = document.createElement('a');
            a.className = 'float Kachel';

            //document.createElement('i');
            var linkText = document.createTextNode("Bee:"+json.Price);
            a.appendChild(linkText);

            // a.title = "my title text";
            a.href = json.RemoteURL;

            document.body.appendChild(a);
        } else {
            //  case2 (not found), e.g.:
            // {"PreviewImageUrl":"","Price":"","RemoteURL":
            // "https://www.honestbee.tw/zh-TW/groceries/stores/carrefour/products/0",
            // "Title":""}
        }
    });
}
