const knex = require('knex');

const knexInstance = knex({
  client:'pg',
  connection:'postgresql://dunder_mifflin:p@localhost/knex_practice',
});

function allItemsContain(searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name','ILIKE',`%${searchTerm}%`)
    .then(result=>console.log(result));
}

allItemsContain('oo');

function paginated(pageNumber){
  const offset = 6*(pageNumber-1);
  knexInstance
    .select()
    .from('shopping_list')
    .limit(6)
    .offset(offset)
    .then(x=>console.log(x));
}

paginated(3);

function addedAfter(daysAgo){
  knexInstance
    .select()
    .from('shopping_list')
    .where('date_added','>',knexInstance.raw(`now()-'?? days'::INTERVAL`,daysAgo))
    .then(x=>console.log(x));
}

addedAfter(3);

function totalCost(){
  knexInstance
    .select('category',knex.raw('SUM(price)'))
    .from('shopping_list')
    .groupBy('category')
    .then(x=>console.log(x));
}

totalCost();