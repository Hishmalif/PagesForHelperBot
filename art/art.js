let x = 0;
let suggestions = [];

// Method for add field to create param search in json data
function addInput() {
    const profile = document.getElementById('params');
    const div = document.createElement('div');
    div.id = 'input' + ++x;
    div.innerHTML = '<input class="text-field-2 w-input" maxlength="4096" name="param-json" data-name="Param JSON"' +
        ' placeholder="Enter field name" type="text" id="param-json_' + x + '"/>' +
        '<div class="dropdownContainer" id="dropdownContainer_' + x + '"></div>';
    profile.appendChild(div);

    // Add dropdown list when user writes input
    const paramJsonInput = div.querySelector("#param-json_" + x);
    paramJsonInput.addEventListener("input", function () {
        dropdownList(paramJsonInput.value, x);
    });
}

// Method for delete field to create param search data
function delInput() {
    if (x <= 1) {
        document.getElementById('param-json_1').value = '';
        return;
    } else {
        document.getElementById('input' + x).remove();
    }
    --x;
}

// Method for get unique json fields
function getUniqueJsonFields(node, prefix, uniqueFields) {
    if (node && typeof node === 'object') {
        if (Array.isArray(node)) {
            node.forEach((element) => {
                getUniqueJsonFields(element, prefix, uniqueFields);
            });
        } else {
            let hasNonLeaf = false;
            Object.entries(node).forEach(([key, value]) => {
                if (typeof value === 'object' || Array.isArray(value)) {
                    getUniqueJsonFields(value, prefix + key + ".", uniqueFields);
                } else {
                    const field = prefix + key;
                    hasNonLeaf = true;
                    if (!uniqueFields.has(field)) {
                        if (hasNonLeaf) {
                            uniqueFields.add(prefix.slice(0, -1));
                        }
                    }
                }
            });
        }
    }
    return uniqueFields;
}

// Function for displaying hints
function dropdownList(inputValue, index) {
    const autocompleteItems = document.getElementById("dropdownContainer_" + index);
    if (!autocompleteItems) {
        console.error("Element .dropdownContainer no such");
        return;
    }
    const json = document.getElementById("jsonData").value.trim();
    autocompleteItems.innerHTML = '';
    suggestions = Array.from(getUniqueJsonFields(JSON.parse(json), "", new Set()));


    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    const maxSuggestions = 10;
    for (let i = 0; i < Math.min(filteredSuggestions.length, maxSuggestions); i++) {
        const suggestion = filteredSuggestions[i];
        const suggestionElement = document.createElement("div");
        suggestionElement.className = "autocomplete-item";
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener("click", () => {
            document.getElementById("param-json_" + index).value = suggestion;
            autocompleteItems.innerHTML = '';
        });
        autocompleteItems.appendChild(suggestionElement);
    }
}