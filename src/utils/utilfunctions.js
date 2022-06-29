export const updateItem =(id, whichValue, newValue,array,setArray)=> {
    let index = array.findIndex(x=> x.id === id);
    console.log(index,'index')
    if (index !== -1){
        let temporaryArray = array.slice();
        temporaryArray[index][whichValue] = newValue;
        console.log('nice',newValue);
        setArray(temporaryArray);
    }
    else {
        console.log('no match');
    }
}

export const images = [
    require('../../assets/avatars/ball.jpg'),
    require('../../assets/avatars/balloon.jpg'),
    require('../../assets/avatars/dolphins.jpg'),
    require('../../assets/avatars/drink.jpg'),
    require('../../assets/avatars/flamingo.jpg'),
    require('../../assets/avatars/palm.jpg'),
    require('../../assets/avatars/sandals.jpg'),
    require('../../assets/avatars/ship.jpg'),
    require('../../assets/avatars/suitcase.jpg'),
  ]
