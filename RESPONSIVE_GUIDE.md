# Responsive Design Guide - Laptops & MacBooks Optimization

## Overview
This guide documents the optimized responsive breakpoints for your Axelerate platform, specifically designed for laptops and MacBooks alongside mobile/tablet views.

## Device Breakpoints

### Desktop & Laptop Breakpoints (Descending Order)

| Breakpoint | Device | Resolution | Characteristics |
|-----------|--------|-----------|-----------------|
| **1920px+** | Desktop / Large Monitor | 1920x1080+ | Ultra-wide displays, external monitors |
| **1728px - 1920px** | MacBook 16" (M3/M3 Pro/Max) | 1728x1080 (scaled) | Professional workflows, video editing |
| **1600px - 1727px** | Windows Laptop 1600 | 1600x900 | Common enterprise laptops |
| **1512px - 1599px** | MacBook 14" (M3 Pro/Max) | 1512x960 (scaled display) | Developer laptops with scaling |
| **1440px - 1511px** | Windows/Mac Laptop | 1440x900 | Popular mid-range laptops |
| **1366px - 1439px** | Windows Standard | 1366x768 | Dell Inspiron, HP Pavilion, etc. |
| **1280px - 1365px** | MacBook 13" (M1/M2/M3) | 1280x800 (native) | Entry-level professional laptops |
| **1024px - 1279px** | iPad Pro / Large Tablets | 1024x768+ | Tablet-sized devices with desktop capabilities |

### Mobile & Tablet Breakpoints (Already Configured)
- **901px - 1023px**: Tablet standard view
- **630px - 900px**: Tablet small / Mobile landscape
- **480px - 629px**: Mobile phones
- **Below 480px**: Compact mobile phones

## CSS Files Modified

### New File: `src/css/responsive-laptops.css`
**Purpose**: Centralized laptop/MacBook optimizations
- Contains all laptop breakpoints (1920px down to 1024px)
- Importred in `main.js` to apply globally
- Can be overridden by specific component CSS

### Existing Files With Enhancements
1. **`src/css/preview.css`** - Needs updating (Preview page)
2. **`src/css/style.css`** - Needs updating (Home page)
3. **`src/components/auditorio/auditorio.css`** - Event preview section
4. **`src/components/ticket/ticket.css`** - Ticket display
5. **`src/components/asesor/asesor.css`** - Advisor/consultant section
6. **`src/components/carrusel/carrusel.css`** - Speaker carousel
7. **`src/components/cronograma/cronograma.css`** - Timeline section

## Implementation Rules

### 1. **Font Sizes for Laptops**
Gradually scale down as screen size decreases:
- **1920px+**: 100% (base size)
- **1728px**: 94% of base
- **1600px**: 88% of base
- **1512px**: 84% of base
- **1440px**: 80% of base
- **1366px**: 76% of base
- **1280px**: 72% of base
- **1024px**: 60% of base (start stacking)

### 2. **Padding Strategy**
- **1920px+**: `6rem 8rem` (generous spacing)
- **1728px**: `5.5rem 7rem`
- **1600px**: `5rem 6.5rem`
- **1512px**: `4.5rem 6rem`
- **1440px**: `4.5rem 5.5rem`
- **1366px**: `4rem 5rem`
- **1280px**: `3.5rem 4.5rem`
- **1024px**: `3rem 3.5rem` then stack

### 3. **Layout Rules**
- **1024px and above**: Keep 2-column layout (side-by-side)
- **Below 1024px** (handled by existing CSS): Stack vertically

### 4. **Image/Video Sizes**
Scale proportionally:
| Breakpoint | Event Box | Carousel | Section Image |
|-----------|-----------|----------|---------------|
| 1920px+ | 450√px | 450px | 350px |
| 1728px | 420px | 420px | 330px |
| 1600px | 400px | 380px | 310px |
| 1512px | 380px | 350px | 300px |
| 1440px | 370px | 320px | 290px |
| 1366px | 350px | 300px | 280px |
| 1280px | 320px | 270px | 260px |
| 1024px | 100% | 240px | 240px |

## Viewport Meta Tag (in index.html)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

## CSS Import Order (in main.js)
```javascript
import 'normalize.css'
import './css/style.css'
import './css/button.css'
import './css/responsive-laptops.css'  // ← Global laptop optimizations
import './components/ticket/ticket.css'
```

## Testing Checklist for Laptops

### Visual Tests
- [ ] MacBook 13" (1280x800) - Text readability, no overflow
- [ ] MacBook 14" (1512x960) - Professional appearance
- [ ] MacBook 16" (1728x1080) - Full layout utilization
- [ ] Windows 1366x768 - Most common Windows resolution
- [ ] Desktop 1920x1080 - No excessive whitespace
- [ ] Ultra-wide 2560x1440 - Proper scaling

### Interaction Tests
- [ ] Video player sizing consistent across breakpoints
- [ ] Buttons properly spaced and clickable (min 44px)
- [ ] Navigation readable without horizontal scroll
- [ ] Modal dialogs fit within viewport
- [ ] Carousel images load quickly

### Performance Notes
- Font sizes scale smoothly (no jarring jumps)
- Transition between breakpoints feels natural
- Images are optimized for each breakpoint
- CSS is loaded only once (not duplicated)

## Future Enhancements

1. **CSS Variables**: Convert to CSS custom properties for easier maintenance
   ```css
   :root {
     --font-lg: 4.5rem;
     --padding-lg: 6rem 8rem;
     --event-box-max: 450px;
   }
   ```

2. **Container Queries**: Use for component-level responsive design (when browser support improves)

3. **Aspect Ratio Standardization**: Ensure all media maintains consistent proportions

## Browser Compatibility

- Chrome/Edge: Full support ✓
- Firefox: Full support ✓
- Safari: Full support (test on actual MacBooks) ✓
- Mobile browsers: Delegated to existing mobile breakpoints ✓

## Notes

- Breakpoints use `min-width` for larger screens → `max-width` for smaller
- This prevents media query conflicts
- All laptop breakpoints are integrated into a single file for easy maintenance
- Component-specific CSS can override global settings using specificity or !important (use sparingly)

---

**Last Updated**: March 6, 2026
**Maintained By**: Development Team
