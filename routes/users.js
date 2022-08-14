import express from 'express';
import { v4 as uuidv4 } from 'uuid';

    

const router = express.Router();


let users = []

router.get('/', (req, res) => {
   res.send(users);
    res.send("Users");
});

router.post('/', (req, res) => {
    console.log('Post route reached');
    // console.log(req.body); the best we can do is to store req.body in any const

    const user = req.body;
   
    users.push({ ...user, id: uuidv4() });
    res.send(`User with the name ${user.firstName} has been added`);

});

router.get('/:id', (req, res) => {
    const { id } = req.params;
   const findUser =users.find((user) => user.id === id);
    res.send(findUser);
});



router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);
    res.send(`User with the id ${id} has been deleted`);

});


router.patch('/:id', (req, res) => {
  const{ id } = req.params;
const { firstName, lastName ,age} = req.body;   

  const user = users.find((user) => user.id === id);

    if(firstName) {
        user.firstName = firstName;
    }
    if(lastName) {
        user.lastName = lastName;
    }
    if(age) {
        user.age = age;
    }

    res.send(`User with the id ${id} has been updated`);
});
export default router;