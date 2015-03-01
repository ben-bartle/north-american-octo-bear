/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Item = require('../api/item/item.model');
var Itemlist = require('../api/itemlist/itemlist.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Item.find({}).remove(function(){
  Item.create(  
  {
    type: 'spell',
    active: true,
    data : { 
      name : "Blade Barrier", 
      school : "evocation", 
      castingTime : "1 action", 
      range : "90 feet", 
      components : "V, S", 
      duration : "Concentration, up to 10 minutes", 
      description : "You create a vertical wall of whirling, razor-sharp blades made of magical energy. The wall appears within range and lasts for the duration. You can make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides three-quarters cover to creatures behind it, and its space is difficult terrain. \n\nWhen a creature enters the wall's area for the first time on a turn or starts its turn there, the creature must make a Dexterity saving throw. On a failed save, the creature takes 6d10 slashing damage. On a successful save, the creature takes half as much damage.",
      level : 6, 
      casters : [ "Cleric" ] 
    }
  },{
    type: 'spell',
    active: true,
    data : { 
      name : "Bless", 
      school : "enchantment", 
      castingTime : "1 action", 
      range : "30 feet", 
      components : "V, S, M (a sprinkling of holy water)", 
      duration : "Concentration, up to 1 minute", 
      description : "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw. \n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.", 
      level : 1, 
      casters : [ "Cleric", "Paladin" ] 
    },
  },{
    type: 'spell',
    active: true,
    data : { 
      name : "Blight", 
      school : "necromancy", 
      castingTime : "1 action", 
      range : "30 feet", 
      components : "V, S", 
      duration : "Instantaneous", 
      description : "Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw. The target takes 8d8 necrotic damage on a failed save, or half as much damage on a successful one. This spell has no effect on undead or constructs.\n\nIf you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it.\n\nIf you target a nonmagical plant that isn't a creature, such as a tree or shrub, it doesn't make a saving throw; it simply withers and dies. \n\n**At Higher Levels.** When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th.", 
      level : 4, 
      casters : [ "Druid", "Sorcerer", "Warlock", "Wizard" ] 
    }
  }, function() {
    console.log('populated items');
    createLists();
  });
  
});

function createLists(){
  Itemlist.find({}).remove(function(){
    Item.find({})
      .select('_id')
      .exec( function(err, items) {
        var ids = items.map(function(i){return i._id});    
        Itemlist.create(
        {
          name: 'all',
          items: ids,
          active: true
        },function(){
          console.log('item lists created');
        });
      });

    Item.find({type: 'spell'})
      .select('_id')
      .exec( function(err, items) {
        var ids = items.map(function(i){return i._id});    
        Itemlist.create(
        {
          name: 'all spells',
          items: ids,
          active: true
        },function(){
          console.log('item lists created');
        });
      });

    Item.find({type: 'monster'})
      .select('_id')
      .exec( function(err, items) {
        var ids = items.map(function(i){return i._id});    
        Itemlist.create(
        {
          name: 'all monsters',
          items: ids,
          active: true
        },function(){
          console.log('item lists created');
        });
      });

  });
}
