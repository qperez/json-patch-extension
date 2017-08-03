# json-patch-extension

A website and a repository to create JSON Patch easily when we use JSON.  
Why the json-patcher is very cool for developers ?  

Because JSON is today everywhere and many developers use JSON APIs with a high-level of Richardson maturity model. 
<img src="http://s2.quickmeme.com/img/c4/c4083d836ddff66aadf770fddf6c865feb6c9c6db293f2ade3da3a0e5f2cf675.jpg" width="40%">

The patch is often obtained by the difference of two JSON objects. However today I have no founded applications are able to do this operation, furthermore produce manually a patch can be tedious. (the following meme is the server response I try to create my json PATCH without library)

<img src="https://www.mememaker.net/static/images/memes/4148664.jpg" width="30%">  

The json-patcher allows to create a JSON patch with the "diff" operation between two json objects. json-patcher allows to validate a patch on a JSON object. 
Soon, I would like to integrate the validation of a patch on JSON-LD objects with "compact" and "expand" functions.

## Try this !

You can find the json-patcher website at this address : <https://github.com/Starcounter-Jack/JSON-Patch)https://qperez.github.io/json-patcher>

## Hopefully soon...

Fonctionnalities to compress and expand json-ld objects directly into the patcher.

## Librairies used

The json-patch-extension uses these following libraries and frameworks : 
* [fast-JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch)
* [jsonldjs](https://github.com/digitalbazaar/jsonld.js)
* [Bootstrap 4 alpha](https://v4-alpha.getbootstrap.com)

## Licence 

I am a french developer which defending the free software, this is why the json-patcher is licenced with GNU GPL v.3,
se more here : <https://github.com/qperez/json-patcher/blob/master/LICENSE>
