# search-food-price-extension 

## Installation

1. Git clone this project. 
2. Follow https://developer.chrome.com/extensions/getstarted#manifest (Open the Extension Management page...) to install this extension (select this project folder into chrome extension management). 
3. Launch its server https://github.com/grimmer0125/search-food-price-server then use this extension. 

## Issues and ToDo list
1. Hide the price icon of this chrome extension if the honestbee is higher. ( It is always shown for debugging purpose)
2. Usually the match is not perfect and there is no exactly the same product name on different sites. The server may find out 10 products including the product name (from source site, e.g.  on honestbee and will choose a minimal price to retrun. This is a challenging part and it need some work to make a better match. 
3. Add more stores support. such as 美福 https://www.mayfullfinefoods.com/ (but it is more compilcated than `carrefour` and needs extra work, e.g. strip `【頂級熟成原料肉】美國特選Prime冷藏翼板原料/1672g` -> `美國特選Prime冷藏翼板原料` (<-honestbee uses this) to make a better match. 
4. Not only compare with Honestbee, also compare with other stores. 


