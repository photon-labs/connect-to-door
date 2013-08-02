//
//  ctdCustomTextField.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 8/1/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdCustomTextField.h"

@implementation ctdCustomTextField

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
    }
    return self;
}

- (CGRect)caretRectForPosition:(UITextPosition *)position {
    return CGRectZero;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
