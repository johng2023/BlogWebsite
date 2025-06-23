import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

const posts = [];

app.get('/', (req, res) => {
    const message = req.query.message;
    res.render("index.ejs", { posts, message })
})

app.get('/post', (req, res) => {
    res.render('post.ejs')
})

app.post('/', (req, res) => {

    const post = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        title: req.body["title"],
        blogText: req.body["textarea"]
    }


    posts.push(post);
    res.redirect('/?message=Post%20created%20successfully!');
})

app.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            res.render('edit.ejs', { post: posts[i] });
            return;
        } 
    }
    res.redirect("/");
})

app.post('/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            posts[i].title = req.body.title;
            posts[i].blogText = req.body.textarea;
            break;
        }
    }
    res.redirect('/');
});


app.post('/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < posts.length; i++){
        if(posts[i].id === id){
            posts.splice(i, 1);
            break;
        }
    }
    res.redirect("/")

})


app.listen(port, () => {
console.log(`Listening on port ${port}`);
})

