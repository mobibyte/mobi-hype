// Fetches RSS feed from the given URL using the Fetch API.
fetch("https://mavorgs.campuslabs.com/engage/events.rss")
   .then((response) => response.text())  // Converts the fetched response into text format, which will be the raw XML data.
   .then((xml) => {
      // Parses the XML text using DOMParser to convert it into a navigable XML Document.
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");

      // Selects all <item> elements from the XML Document, which represent individual RSS items (events).
      const items = xmlDoc.querySelectorAll("item");

      // Retrieves the HTML element with id 'event-list' where event details will be displayed.
      const eventList = document.getElementById("event-list");

      // Iterates through each item in the RSS feed.
      items.forEach((item) => {
         // Searches for a <host> element and checks if its text content matches 'Mobi'.
         const host = item.querySelector("host");
         if (host && host.textContent.trim() === "Association for Computing Machinery") {
            // Retrieves the title of the event.
            const title = item.querySelector("title").textContent;

            // Retrieves and processes the description of the event.
            let description = item.querySelector("description").textContent;

            // Creates a temporary HTML <div> element to manipulate the HTML content of the description.
            const tempElement = document.createElement("div");
            tempElement.innerHTML = description;

            // Removes all elements with class '.p-name.summary' from the description.
            const excludedElements = tempElement.querySelectorAll(".p-name.summary");
            excludedElements.forEach((el) => el.remove());

            // Updates the description with the cleaned HTML content.
            description = tempElement.innerHTML;

            // Creates a new <div> element for the event and adds HTML content including the title and description.
            const eventItem = document.createElement("div");
            eventItem.classList.add("event");
            eventItem.innerHTML = `
            <h2>${title}</h2>
            <hr/>
            <p>${description}</p>
            `;

            // Appends the event item to the event list in the HTML page.
            eventList.appendChild(eventItem);
         }
      });
   })
   .catch((error) => console.error("Error fetching RSS feed:", error));  // Logs any error that occurs during the fetch operation.
