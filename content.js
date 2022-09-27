let codingSpace = document.getElementsByClassName('CodeMirror')[0]
let innerSpace = document.getElementsByClassName('CodeMirror-code')[0]

let positionedDivs = innerSpace.querySelectorAll('.CodeMirror-code > div')
const options = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
}
codingSpace.style.backgroundColor = "black";

function allBlack() {
    let spans = codingSpace.querySelectorAll('span')
    for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = "black"
        spans[i].style.backgroundColor = "black"

    }
}

let brackets = false
allBlack()


let lineNumDiv = document.getElementsByClassName("CodeMirror-linenumber")
let lineNum = lineNumDiv[lineNumDiv.length - 1].innerHTML
let currentLine = document.getElementsByClassName('CoddeMirror-activeline')[0]
let bracketSpansArray = []

function callback(mutationList, observer) {
    mutationList.forEach(function (mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
            let bracketSpans = document.querySelectorAll("span.CodeMirror-matchingbracket")
            if (bracketSpans.length > 0) {
                brackets = true
                for (let i = 0; i < bracketSpans.length; i++) {
                    let parentNode = bracketSpans[i].parentNode
                    let childNodes = parentNode.querySelectorAll("span")
                    bracketSpansArray.push(parentNode)
                    for (let j = 0; j < childNodes.length; j++) {
                        childNodes[j].style.color = "black"


                    }
                }
            }
            allBlack()
            let cm = document.querySelectorAll(".cm-variable, .cm-string, .cm-keyword, .cm-def")
            console.log(cm)
            for (let i = 0; i < cm.length; i++) {
                cm[i].style.color = "black"
            }






            let target = mutation.target
            if (target.className == "CodeMirror-activeline") {
                currentLine = target
                let activespan = target.querySelectorAll('span')
                for (let j = 0; j < activespan.length; j++) {
                    activespan[j].style.backgroundColor = "black"
                    activespan[j].style.color = "black"

                }
            }
        }


        if (mutation.type = "childList" && mutation.target.className == "CodeMirror-activeline") {

            currentLine = mutation.target
            currentspan = currentLine.querySelectorAll('span')
            // console.log(currentspan)
            for (let j = 0; j < currentspan.length; j++) {
                // if (currentspan[j].classList.contains("CodeMirror-matchingbracket")) {
                //     currentspan[j].classList.remove("CodeMirror-matchingbracket")
                // }
                currentspan[j].style.backgroundColor = "black"
                currentspan[j].style.color = "black"

            }



        }

        lineNumDiv = document.getElementsByClassName("CodeMirror-linenumber")
        if (lineNumDiv[lineNumDiv.length - 1].innerHTML != lineNum) {
            let newObserver = new MutationObserver(callback)

            currentLine = document.getElementsByClassName("CodeMirror-activeline")[0]
            positionedDivs = innerSpace.querySelectorAll('.CodeMirror-code > div')
            let prevLine = positionedDivs[Array.from(positionedDivs).indexOf(currentLine) - 1] || null
            let prevspan = prevLine.querySelectorAll("span")
            currentspan = currentLine.querySelectorAll("span")
            for (let i = 0; i < currentspan.length; i++) {
                currentspan[i].style.color = "black"
            }
            for (let j = 0; j < prevspan.length; j++) {
                prevspan[j].style.color = "black"
            }
            lineNum = lineNumDiv[lineNumDiv.length - 1].innerHTML
            newObserver.observe(currentLine, options)
            newObserver.observe(prevLine, options)
        }

    })
}

for (let j = 0; j < positionedDivs.length; j++) {
    let observer = new MutationObserver(callback)
    observer.observe(positionedDivs[j], options)
}


