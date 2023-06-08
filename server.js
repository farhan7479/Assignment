const express = require('express');
const item = require('./item_list.json');




const app= express();


const PORT=  8080;

//PRODUCT LIST API
app.get('/api/products/list',(req,res)=>{
    const {size ,page} =req.query;
    const offset = (parseInt(page)-1)*parseInt(size);
    const items= item.slice(offset,offset+parseInt(size)).map(i =>({
        id:i.id,
        item_name: i.item_name,
        item_image:i.item_image,
        item_price:i.item_price,
    }));
    res.json(items);
});



//PRODUCT DETAILS API
app.get('/api/products/:id',(req,res)=>{
    const productId = req.params.id;
  
    const product = item.find(i => i.id == Number(productId));

    if(!product){
        res.status(404).json({error:'Product not found'});
    }
    const {
        id,
        item_name,
        item_image,
        import_date,
        expiration_date,
        item_price,
        item_quantity,
        item_weight,
        item_tax,
        item_availability,
      } = product;

      res.json({
        id,
      item_name,
      item_image,
      import_date,
      expiration_date,
      item_price,
      item_quantity,
      item_weight,
      item_tax,
      item_availability,
    });


});

//APP LISTEN

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})