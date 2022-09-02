import React, {useEffect, useState} from 'react'
import Spinner from "react-bootstrap/Spinner";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios'

export default function News() {
const[news, setNews] = useState([])
const[search, setSearch]= useState([])

console.log(news);
useEffect(() => {
   getNews()
}, []);
function getNews() {
    Axios.get("https://myjson.dit.upm.es/api/bins/fsxf")
    .then((result) => {
        setNews(result.data)
        setSearch(result.data)
    }).catch((err) => {
        console.log(err);
    });
}

function searchFun(value) {
     let search= news.filter(item => {
        return (item.title.toLowerCase().includes(value.toLowerCase()))
     })
     setSearch(search)
}
// let  category = []
function Category(value) {
    console.log(value.target.value);
    let category = news.filter(item => {
        return(item.categories.includes(value.target.value))
    })
    setSearch(category)
}


//----------------Modal------------------------
const [show, setShow] = useState(false);

const [title , setTitle]= useState("")
const [cat , setcat]= useState("")
const [currentIndex , setCurrentIndex] = useState('')

function handleShow(index){
    setShow(true);
    console.log(index);
    setCurrentIndex(index)
    setTitle(news[index].title)
    setcat(news[index].categories)
    // console.log("ishla")
    
}
function handleClose() {
setShow(false);
    
    let newNews = [...news]
    newNews[currentIndex].title = title
    newNews[currentIndex].categories = cat
    
    
}

  return (

    <div className='row m-4'>
        <div className='col-3'>
            <input onInput={(val) => searchFun(val.target.value)} type="text" placeholder='Title' />
        </div>
        <div className='col-3'>
        <Form.Select aria-label="Default select example " onChange={(val)=>Category(val)}>
                        <option>Open this select menu</option>
                        <option  value="Mahalliy">Mahalliy</option>
                        <option  value="Dunyo">Dunyo</option>
                        <option value="Sport">Sport</option>
                        <option value="Asosiy yangiliklar">Asosiy yangiliklar</option>
                        <option value="Reklama">Reklama</option>
                    </Form.Select>
        </div>
        
     
      <div className='row m-2'>
      {(search.length >0 ? search.map((item,index)=> {
        return (
           
            <div className='col-4 p-2' >
            <div class="card" onClick={() =>handleShow(index)}  key={index} >
            <img class="card-img-top" src={item.src} alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title" >{item.title}</h5>
              <p class="card-text">{item.categories}</p>
  
</div>
            </div>
           </div>
        )
      })
      : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      )}
      </div>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input value={title} onInput={(val) => setTitle(val.target.value)} type="text" placeholder='Sarlavhani kiriting'/>
            <input value={cat} onInput={(val) => setcat(val.target.value)} type="text"placeholder='Categoriyasini kiriting'/>                 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    
  )
}
