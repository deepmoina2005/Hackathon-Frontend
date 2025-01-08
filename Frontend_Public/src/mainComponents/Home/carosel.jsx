import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin({ itemCount = 5 }) {
  // Autoplay plugin reference
  const plugin = React.useRef(null);

  // Initialize plugin using useEffect
  React.useEffect(() => {
    plugin.current = Autoplay({ delay: 2000, stopOnInteraction: true });
    return () => plugin.current?.destroy?.(); // Cleanup if necessary
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      aria-label="Numbered carousel"
      onMouseEnter={() => plugin.current?.stop()}
      onMouseLeave={() => plugin.current?.reset()}
    >
      <CarouselContent>
        {Array.from({ length: itemCount }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
