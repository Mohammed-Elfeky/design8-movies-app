$(document).ready(function(){
    new WOW().init();
})
let apiResult=[]
let searchResult=[]
searchAndDisplay('')
$('#search1').keyup(function(){
    let word =$(this).val()
    searchAndDisplay(word)
})

$('#search2').keyup(function(){
    if(apiResult.length !== 0){
       
       let word =$(this).val()

       if(word === ''){
            $('.display-existing-movies .row').html('')
       }else{
            searchResult=apiResult.filter(ele=>{
                return ele.original_title.toLowerCase().indexOf(word.toLowerCase()) !== -1
            })
            console.log(searchResult)
            secondDisplayMovies()
       }
       
    
    }
    
})

async function search(word){
    
    if(word === ''){
        let movies=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=3d345e53405a96f0c4488cd3dd27dea3`)
        let moviesReadble = await movies.json()
        console.log(moviesReadble)
        apiResult=moviesReadble.results
    }else{
        let movies=await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=3d345e53405a96f0c4488cd3dd27dea3`)
        let moviesReadble = await movies.json()
        console.log(moviesReadble)
        apiResult=moviesReadble.results
    }    
}

function displayMovies(){
    console.log(apiResult)
    $('.display-movies .row').html('')
    apiResult.forEach(ele=>{
        
        $('.display-movies .row').append(
            `<div class="col-md-4 mb-4">
               <div class="item">
                    <img src="https://image.tmdb.org/t/p/w500${ele.poster_path}" class="w-100" alt="" srcset="">
                    <div class="overlay text-center p-2">
                        <h2 class=" text-capitalize">${ele.original_title}</h2>
                        <p>${ele.overview}</p>
                        <p> rating:${ele.vote_average} </p>
                        <p>${ele.release_date}</p>
                    </div>
                </div>
             </div>
            `
        )
    })
}
async function searchAndDisplay(word){
    await search(word)
    displayMovies()
}
$('.nav-open').click(function(){

    $('.nav').toggleClass('open')

    if($('.nav').css('left') === '-250px'){

        $('.nav-open .mid').html(
            `<i class="fa fa-times" aria-hidden="true"></i>`
        )

        $('.nav-content p').css({'transform':'translateY(0px)','opacity':'1'})
        $('#one').css('transition-delay','.1s')
        $('#two').css('transition-delay','.3s')
        $('#three').css('transition-delay','.5s')
        $('#four').css('transition-delay','.7s')
        $('#five').css('transition-delay','.9s')
        $('#six').css('transition-delay','1.1s')


    }else{
        $('.nav-open .mid').html(
            `<i class="fa fa-bars" aria-hidden="true"></i>
            `
        )
        
        $('.nav-content p').css({'transform':'translateY(300px)','opacity':'0'})
        $('#one').css('transition-delay','.11s')
        $('#two').css('transition-delay','.09s')
        $('#three').css('transition-delay','.07s')
        $('#four').css('transition-delay','.05s')
        $('#five').css('transition-delay','.01s')
        $('#six').css('transition-delay','0s')
        
    }
    
})
function secondDisplayMovies(){
    $('.display-existing-movies .row').html('')
    searchResult.forEach(ele=>{
        $('.display-existing-movies .row').append(
            `<div class="col-md-4 mb-4">
               <div class="item">
                    <img src="https://image.tmdb.org/t/p/w500${ele.poster_path}" class="w-100" alt="" srcset="">
                    <div class="overlay text-center p-2">
                        <h2 class=" text-capitalize">${ele.original_title}</h2>
                        <p>${ele.overview}</p>
                        <p> rating:${ele.vote_average} </p>
                        <p>${ele.release_date}</p>
                    </div>
                </div>
             </div>
            `
        )
    })
}
$('.nav-content p').click(

    async function(){
        let yu=await fetch($(this).attr('name'))
        let yi =await yu.json()
        apiResult=yi.results
        displayMovies()
                  }

)

$('#six-link').click(function(){
    let targetElementId=$(this).attr("href")
    let targetElementDistanceToTop=$(targetElementId).offset().top
    $('html,body').animate({ scrollTop:targetElementDistanceToTop },1000)
})



$('#name').keyup(function(){
    let regex=/^[A-Za-z0-9]{3,}$/
    let written=$(this).val()
    let match =regex.test(written)
    if(written===''){
        $(this).next().html('this input can not be empty')
        $('#submit').css('display','none')
    }else if(match){
        $(this).next().html('')
        $('#submit').css('display','block')
    }else{
        $(this).next().html('enter a valid name')
        $('#submit').css('display','none')
    }
    
})

$('#email').keyup(function(){
    let regex=/^[A-Za-z0-9]{1,20}\@[A-Za-z]{1,10}\.[A-Za-z]{2,10}$/
    let written=$(this).val()
    let match =regex.test(written)
    if(written===''){
        $(this).next().html('this input can not be empty')
        $('#submit').css('display','none')
    }else if(match){
        $(this).next().html('')
        $('#submit').css('display','block')
    }else{
        $(this).next().html('enter a valid email')
        $('#submit').css('display','none')
    }
    
})

$('#phone').keyup(function(){
    let regex=/^(011|012|015)[0-9]{8}$/
    let written=$(this).val()
    let match =regex.test(written)
    if(written===''){
        $(this).next().html('this input can not be empty')
        $('#submit').css('display','none')
    }else if(match){
        $(this).next().html('')
        $('#submit').css('display','block')
    }else{
        $(this).next().html('enter a valid phone')
        $('#submit').css('display','none')
    }
    
})

$('#age').keyup(function(){
    let regex=/^(1[5-9]|20|[2-9][0-9]|1[0-1][0-9]|120)$/
    let written=$(this).val()
    let match =regex.test(written)
    if(written===''){
        $(this).next().html('this input can not be empty')
        $('#submit').css('display','none')
    }else if(match){
        $(this).next().html('')
        $('#submit').css('display','block')
    }else{
        $(this).next().html('the age must be between 15-120')
        $('#submit').css('display','none')
    }
    
})




