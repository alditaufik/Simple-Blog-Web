import express from "express"
import _ from "lodash"

import path from "path"
import url from "url"

const app = express();
const port = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




//local user
app.use((req, res, next) => {
    res.locals.user = user[0];
    next();
});

//user
const user =[{ firstName: 'A', lastName: 'Taufik', admin: 'true'}]

//post stored here
const posts =[{Title: "Lorem Ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet eros id nulla accumsan semper. Nulla facilisi. Sed malesuada sollicitudin pharetra. Morbi porta neque vitae risus efficitur, id faucibus turpis porttitor. Curabitur sed augue quis nulla dictum varius. Ut eu feugiat orci. Praesent finibus pharetra rhoncus. Fusce egestas nibh sit amet dignissim luctus. Praesent ac tellus metus. Praesent nisi leo, vehicula ut fringilla ac, fringilla ut ex. Duis at lectus nec nibh vestibulum lacinia. Maecenas at ipsum et ipsum placerat mollis. Vestibulum lacus sapien, volutpat non tincidunt id, sollicitudin vitae tellus. Aliquam bibendum ac quam eget congue. Phasellus vitae tempor turpis. Cras iaculis purus sit amet venenatis vulputate.Donec ac massa massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Nam quis nibh urna. Cras rutrum, nibh a tincidunt suscipit, nulla massa dapibus sapien, eu venenatis orci est nec ligula. Proin dignissim id lectus sed ultricies. Suspendisse ultricies sollicitudin pulvinar. Suspendisse vitae placerat metus. In ligula velit, dictum ut convallis laoreet, vehicula sit amet metus. Phasellus in risus dignissim, volutpat nisl sed, efficitur ex. Curabitur id nisl nec magna gravida iaculis. Praesent varius magna id dapibus imperdiet. Integer rhoncus ultricies gravida."}
]


// app.get("/", (req, res)=>{
//     res.render("pages/home.ejs", {user: user});
// });


//route
app.get("/",(req, res)=>{
    res.render("pages/home.ejs", {articles: posts, user: user[0]} );
});
app.get("/home",(req, res)=>{
    res.render("pages/home.ejs", {articles: posts, user: user[0]});
});

app.get("/create", (req, res)=>{
    res.render("pages/create.ejs");
});
//create a post
app.post("/create", (req, res)=>{
    const postTitle = req.body.title
  const postContent = req.body.content
  const postObj = {
    Title: postTitle,
    content: postContent
  }
   posts.push(postObj);
   res.render("pages/home.ejs" ,{articles: posts, user: user[0]} );
   
});

//read post
app.get("/post/:postID", (req, res)=>{
    let postTitle = req.params.postID
    let postContent = ''
    let title = ''

    posts.forEach((post)=>{
        title = post.Title
        postContent = post.content
        if (_.toLower(postTitle) == _.toLower(title)){
            res.render("pages/post.ejs", {title: title, content: postContent})
        }
    })
})

//edit post
app.get("/edit/:postID", (req, res)=>{
    let postTitle = req.params.postID
    let postContent = ''
    let title = ''

    posts.forEach((post, index)=>{
        if (_.toLower(postTitle) == _.toLower(post.Title)){
            title = post.Title
            postContent = post.content
            res.render("pages/edit.ejs", {title: title, content: postContent, index: index})
        }
    })
})

app.post("/edit/:postID", (req, res)=>{
    let postTitle = req.params.postID
    let newTitle = req.body.title
    let newContent = req.body.content

    posts.forEach((post, index)=>{
        if (_.toLower(postTitle) == _.toLower(post.Title)){
            posts[index] = {Title: newTitle, content: newContent}
            res.redirect("/post/"+ newTitle)
        }
    })
})

//delete post
app.get("/delete/:postID", (req, res)=>{
    let postTitle = req.params.postID

    posts.forEach((post, index)=>{
        if (_.toLower(postTitle) == _.toLower(post.Title)){
            posts.splice(index, 1)
            res.redirect("/home")
        }
    })
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})
