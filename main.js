
const loadPhone = async (searchText = '13' ,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data
  // console.log(data.data);
  displayLoadPhone(phones,isShowAll);
}

const displayLoadPhone = (phone,isShowAll) => {

  // step-1 select main container
  const mainContainerId = document.getElementById('main-container')
  mainContainerId.textContent = ''

  const showAllContainer = document.getElementById('show-al-container')

  if (phone.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden')
  }

  // console.log('isshow all' , isShowAll);

  if(!isShowAll){
    phone = phone.slice(0, 12)
  }


  phone.forEach(phone => {
    // console.log(phone);



    // step-2 create  a div
    const createDiv = document.createElement('div')
    createDiv.innerHTML = `
        <div class="card shadow-xl">
                    <figure><img class='w-96 card card-base-100' src=${phone.image} alt="Shoes" /></figure>
                    <div class="card-body text-center items-center">
                      <h2 class="card-title text-3xl ">${phone.phone_name}</h2>
                      <p class='text-2xl'>There are many variation of passages of available,but the majority have suffered</p>
                      <div className="card-actions justify-end">
                        <button onclick=
                        "showAllDetails('${phone.slug}')" class="btn btn-primary text-2xl mt-4">Show Details</button>
                      </div>
                    </div>
                  </div>
        `
    mainContainerId.appendChild(createDiv)

  });

  loadingSpinnerFunc(false)
}

// search handle

const searchHandle = (isShowAll) => {
  loadingSpinnerFunc(true)
  const searchField = document.getElementById('search-field')

  const searchFieldValue = searchField.value
  console.log(searchFieldValue);

  loadPhone(searchFieldValue,isShowAll)

}


// loading spinner function
const loadingSpinnerFunc =(isLoading)=>{
  const loadingSinner = document.getElementById('loading-spinner')
  if(isLoading){
    loadingSinner.classList.remove('hidden')
  }else{
    loadingSinner.classList.add('hidden')
  }
}


 const showAll = ()=>{
  searchHandle(true)
 }



// showAll Details

const showAllDetails = async(id)=>{

  console.log('show all details',id);

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  console.log(data);
  const phone = data.data
  showDetailsPhone(phone)
}


// show details phone
const showDetailsPhone = (phone) =>{

  showDetailModal.showModal()


  const showDetailPhoneName = document.getElementById('show-detail-phone-name')
  showDetailPhoneName.innerText = phone.name

  const showDetailPhone = document.getElementById('show-detail-phone')
  showDetailPhone.innerHTML = `

  <img src=${phone.image} alt="">
  <p>${phone.
    mainFeatures
    .storage}</p>
  `
}
loadPhone()
