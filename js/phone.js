const loadPhone = async (phoneBrand = 'iphone', isShowBtn) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowBtn);
};

const displayPhones = (phones, isShowBtn) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAllBtn = document.getElementById('show-btn');

    if (phones.length > 12 && !isShowBtn) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }

    if (!isShowBtn) {
        phones = phones.slice(0, 12);
    }

    phones.forEach((phone) => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 w-auto shadow-xl m-10`;
        phoneCard.innerHTML = ` <figure class="px-10 pt-10">
                      <img
                        src="${phone.image}"
                        alt="Shoes"
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions">
                        <button onClick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                  </div>`;
        phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);
};
const handleSearch = (isShowBtn) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ? searchField.value : 'iphone';
    loadPhone(searchText, isShowBtn);
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};

const handleShowAll = () => {
    handleSearch(true);
};

const handleShowDetails = async (id) => {
    const res = await fetch(
        ` https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;

    showDetails(phone);
};

const showDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-details-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById(
        'show-detail-container'
    );

    showDetailsContainer.innerHTML = `
        <div class="flex justify-center"> <img class="rounded-lg" src="${
            phone.image
        }" alt=""/></div>
        <div>
          <p><span class="text-xl">Chipset:</span> ${
              phone.mainFeatures.chipSet
          }</p> 
          <p><span class="text-xl">Memory:</span> ${
              phone.mainFeatures.memory
          }</p> 
          <p><span class="text-xl">Storage:</span> ${
              phone.mainFeatures.storage
          }</p> 
          <p><span class="text-xl">Display:</span> ${
              phone.mainFeatures.displaySize
          }</p> 
          <p><span class="text-xl">Bluetooth:</span> ${
              phone.others ? phone.others.Bluetooth : 'None'
          }</p> 
          <p><span class="text-xl">GPS:</span> ${
              phone.others ? phone.others.GPS : 'None'
          }</p> 
          <p><span class="text-xl">Brand:</span> ${phone.brand}</p> 
          <p><span class="text-xl">Slug:</span> ${phone.slug}</p> 
        </div>
    `;
};

loadPhone();
