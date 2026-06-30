Primary call-to-action button — use the gradient `primary` for the one main action on a view; `secondary`/`ghost` for everything else.

```jsx
<Button variant="primary" size="lg" iconRight={<PlayIcon/>}>Inizia a giocare</Button>
<Button variant="secondary">Accedi</Button>
<Button variant="ghost" size="sm">Contattaci</Button>
```

Variants: `primary` (lime→cyan gradient, glows on hover), `secondary` (raised surface), `ghost` (outline), `neonOutline` (teal-tinted outline), `danger`. Sizes: `sm | md | lg`. Pass `block` for full-width, `iconLeft`/`iconRight` for icons.
