import { ScrollTrigger } from "gsap/ScrollTrigger";

export class SplitText {
  elements: HTMLElement[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originalContents: Map<HTMLElement, string> = new Map();

  constructor(
    targets: string | HTMLElement | (string | HTMLElement)[],
    vars: { type?: string; linesClass?: string } = {}
  ) {
    const type = vars.type || "lines,words,chars";
    const linesClass = vars.linesClass || "";

    // Resolve targets
    let resolvedElements: HTMLElement[] = [];
    if (typeof targets === "string") {
      resolvedElements = Array.from(document.querySelectorAll(targets)) as HTMLElement[];
    } else if (targets instanceof HTMLElement) {
      resolvedElements = [targets];
    } else if (Array.isArray(targets)) {
      targets.forEach((target) => {
        if (typeof target === "string") {
          resolvedElements.push(...(Array.from(document.querySelectorAll(target)) as HTMLElement[]));
        } else if (target instanceof HTMLElement) {
          resolvedElements.push(target);
        }
      });
    }
    this.elements = resolvedElements;

    this.elements.forEach((element) => {
      // Store original innerHTML for revert()
      this.originalContents.set(element, element.innerHTML);

      // Extract text content dynamically
      const text = element.textContent || "";
      element.innerHTML = ""; // Clear existing nodes

      const wordsList = text.trim().split(/\s+/);
      const wordSpans: HTMLElement[] = [];

      wordsList.forEach((wordText, wordIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "custom-split-word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        if (type.includes("chars")) {
          // split word into characters
          for (let i = 0; i < wordText.length; i++) {
            const charSpan = document.createElement("span");
            charSpan.className = "custom-split-char";
            charSpan.style.display = "inline-block";
            charSpan.textContent = wordText[i];
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          }
        } else {
          wordSpan.textContent = wordText;
        }

        wordSpans.push(wordSpan);
        element.appendChild(wordSpan);
        this.words.push(wordSpan);

        // Add space after word (except last word)
        if (wordIdx < wordsList.length - 1) {
          element.appendChild(document.createTextNode(" "));
        }
      });

      // Split lines dynamically by reading offsetTop of the child spans
      if (type.includes("lines")) {
        const lineGroups: HTMLElement[][] = [];
        let currentOffset = -9999;
        let currentLine: HTMLElement[] = [];

        wordSpans.forEach((wordSpan) => {
          const offsetTop = wordSpan.offsetTop;
          // Allowing 5px margin of error for line alignment
          if (Math.abs(offsetTop - currentOffset) > 5) {
            if (currentLine.length > 0) {
              lineGroups.push(currentLine);
            }
            currentLine = [wordSpan];
            currentOffset = offsetTop;
          } else {
            currentLine.push(wordSpan);
          }
        });
        if (currentLine.length > 0) {
          lineGroups.push(currentLine);
        }

        // Restructure target DOM structure on lines
        element.innerHTML = "";
        lineGroups.forEach((line) => {
          const lineDiv = document.createElement("div");
          if (linesClass) {
            lineDiv.className = linesClass;
          }
          lineDiv.style.display = "block";

          line.forEach((wordSpan, idx) => {
            lineDiv.appendChild(wordSpan);
            if (idx < line.length - 1) {
              lineDiv.appendChild(document.createTextNode(" "));
            }
          });
          element.appendChild(lineDiv);
          this.lines.push(lineDiv);
        });
      }
    });
  }

  revert() {
    this.elements.forEach((element) => {
      const original = this.originalContents.get(element);
      if (original !== undefined) {
        element.innerHTML = original;
      }
    });
  }
}

export class ScrollSmoother {
  vars: any;
  constructor(vars: any) {
    this.vars = vars;
  }

  static create(vars: any) {
    return new ScrollSmoother(vars);
  }

  scrollTop(val?: number): number {
    if (val !== undefined) {
      window.scrollTo({ top: val, behavior: "auto" });
      return val;
    }
    return window.scrollY;
  }

  paused(state?: boolean): boolean | void {
    if (state !== undefined) {
      document.body.style.overflowY = state ? "hidden" : "auto";
      return state;
    }
    return document.body.style.overflowY === "hidden";
  }

  scrollTo(target: any, smooth?: boolean, _position?: string) {
    let targetTop = 0;
    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element instanceof HTMLElement) {
        targetTop = element.getBoundingClientRect().top + window.scrollY;
      }
    } else if (target instanceof HTMLElement) {
      targetTop = target.getBoundingClientRect().top + window.scrollY;
    } else if (typeof target === "number") {
      targetTop = target;
    }

    window.scrollTo({
      top: targetTop,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  static refresh(_value?: boolean) {
    ScrollTrigger.refresh();
  }
}
