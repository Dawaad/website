<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# General Behaviours

1. Ask, don't assume. If something is unclear, ask before writing a single line. Never make silent assumptions about intent, architecture, or requirements.

2. Simplest solution first. Always implement the simplest thing that could work. Do not add abstractions or flexibility that weren't explicitly requested.

3. Don't touch unrelated code. If a file or function is not directly part of the current task, do not modify it, even if you think it could be improved.

4. Flag uncertainty explicitly. If you are not confident about an approach or technical detail, say so before proceeding. Confidence without certainty causes more damage than admitting a gap.

# React Structure

1. Always use `const` based components.
2. Always keep each file as a singular component
3. Always use a local `Props` interface for each component. Unless the prop interface needs to be global and exported.
4. Always use `FC<Props>` for every component declaration
5. Always logically seperate components based on feature-modules and clear domains.
6. Prioritise context wrappers over state and callback drilling, but always prioritise performance and reducing unecessary re-renders at all costs
