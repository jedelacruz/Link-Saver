let myLeads = []
const inputEl = document.querySelector("#input-el")
const btnSave = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const saveTab = document.querySelector("#save-tab")

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveTab.addEventListener("click" , function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(myLeads))
        render(myLeads)
    });   
})


function render(leads){
    let listItems = ""
    for(let i = 0; i < myLeads.length; i++){
        
        //listItems += "<li><a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
        <li>
            <a target = '_blank' href="${leads[i]}"> 
                ${leads[i]}
            </a>
        </li>
        `


    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick" , function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
btnSave.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    render(myLeads)
})

