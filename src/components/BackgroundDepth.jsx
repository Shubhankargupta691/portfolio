import { memo } from 'react';

/**
 * Editorial Luxury Background
 * Soft gradient wash + film grain overlay
 * No orbital effects, no canvas, no parallax
 */
const BackgroundDepth = memo(() => {
    return (
        <>
            {/* Soft gradient background — fixed behind all content */}
            <div className="fixed inset-0 -z-10">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(232, 224, 240, 0.5) 0%, transparent 50%),
                            radial-gradient(ellipse 70% 50% at 80% 30%, rgba(242, 224, 232, 0.35) 0%, transparent 50%),
                            radial-gradient(ellipse 90% 70% at 50% 80%, rgba(245, 230, 216, 0.3) 0%, transparent 50%),
                            linear-gradient(175deg, #FAF7F2 0%, #F5F0E8 40%, #FAF7F2 70%, #F5F0E8 100%)
                        `,
                    }}
                />
            </div>

            {/* Film grain overlay — subtle texture across entire viewport */}
            <div className="grain-overlay" />
        </>
    );
});

BackgroundDepth.displayName = 'BackgroundDepth';

export default BackgroundDepth;
