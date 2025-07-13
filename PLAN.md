### **1. Implementation Process & Methodology**

My development process for this task was centered on efficiency, modern tooling, and rapid iteration, closely mirroring a real-world agile workflow. I strategically utilized an AI assistant as a development partner to accelerate progress and handle boilerplate tasks, allowing me to focus on architecture and core logic.

- **Initial Planning:** I began by leveraging an AI assistant to analyze the project requirements and generate a structured, step-by-step implementation plan. This ensured a clear path forward and helped in prioritizing tasks within the strict two-hour time frame.

- **Accelerated Learning & Setup:** While I had less direct experience with Chakra UI, I used the AI assistant as an interactive documentation tool. This allowed me to quickly grasp its setup process, `ChakraProvider` configuration, and the API for core components, significantly reducing the learning curve.

- **AI-Assisted Development:** I employed an AI agent in a "pair-programming" capacity. The agent was tasked with bootstrapping the Next.js application, generating initial boilerplate for components, and suggesting code snippets for integrating libraries like `recharts`.

- **Manual Oversight and Critical Refinement:** While the AI accelerated development, I maintained constant oversight and critical judgment. The AI often required significant manual correction, particularly with library-specific implementations. **For instance, the initial structure suggested for the Chakra UI `<Select>` component was incorrect and non-functional; it had to be entirely refactored manually.** This pattern of AI-generated code needing manual fixes was common, reinforcing the need for the developer to be the final authority and debugger.

- **Code Quality and Formatting:** To ensure consistent code quality and readability, I integrated **Prettier** into the project for automated code formatting.

- **Final Delivery:** The process concluded with the preparation of a comprehensive Pull Request, including a detailed description of the work and screenshots to visually demonstrate the dashboard's functionality.

### **2. Future Improvements & Next Steps (TODO)**

Given the time constraints, I focused on delivering a functional core. With additional time, I would address the following areas to move the project towards a production-ready state:

- **Deepen Library-Specific Knowledge:** Dedicate more time to thoroughly review the **Chakra UI** documentation and best practices. While the initial implementation is functional, I recognize my lack of deep familiarity made it difficult to fully verify the idiomatic correctness of every component. A deeper understanding would allow for more optimized use of the library's theming system and component APIs, ensuring the solution is not just working, but also well-architected.

- **URL State Management:** Sync the application's state (selected country and measure) to the URL query parameters. This would make the application state shareable and bookmarkable, improving usability.

- **Comprehensive Testing:** Introduce a robust testing suite.
  - **Unit/Integration Tests:** Use **Jest** and **React Testing Library** to test individual components, state logic, and user interactions.

- **Enhanced User Experience (UX):**
  - **Robust UI States:** Refactor the data fetching logic to provide a more robust loading and error UI. Instead of console logs, I would implement user-facing feedback, such as **toast notifications (snackbars)** for API errors.
  - **Searchable Country List:** For a large dataset of countries, a simple dropdown is inefficient. I would implement a search/filter feature within the `Select` component to improve usability.

- **Code Architecture & Performance:**
  - **Component Abstraction:** Extract common, repeated elements like the styled `Select` control into their own reusable components to follow the DRY (Don't Repeat Yourself) principle.
  - **Data Caching:** A proper data caching strategy requires an analysis of data volatility to determine the necessary update cadence and ensure data freshness.

- **Styling and Theming:**
  - **Centralized Theme:** Fully leverage Chakra UI's theming capabilities by defining a custom theme file with project-specific colors, fonts, and component styles for a consistent and polished brand identity.


### **3. Decisions & Trade-offs**

During development, I made several key technical decisions to optimize for speed and effectiveness within the given time limit.

- **UI Library: Chakra UI vs. Ant Design**
  - **Decision:** I chose **Chakra UI** primarily because I had no prior experience with it and wanted to use this opportunity to personally evaluate its capabilities and developer experience.

- **GraphQL Client: `graphql-request` vs. Apollo Client**
  - **Decision:** I opted for the lighter-weight **`graphql-request`** client. While Apollo Client is more powerful with its caching and state management features, its setup is more involved. `graphql-request` provided a minimal, promise-based API that was perfectly sufficient for the scope of this task and much faster to implement.

- **GraphQL Typing: Manual Typing vs. GraphQL Codegen**
  - **Decision:** I wrote the TypeScript types for the GraphQL responses **manually**. While setting up a tool like GraphQL Code Generator provides superior type safety and automation in larger projects, the time required for its configuration would have been disproportionate for a two-query application under a tight deadline. Manual typing was the more pragmatic trade-off.
