//
//  ctdAlertViewController.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/18/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdAlertViewController.h"
#import "ctdConstants.h"

@interface ctdAlertViewController ()

@end

@implementation ctdAlertViewController

@synthesize delegate = _delegate;

- (id)initViewController:(typeAlert)typeAlert andDelegate:(id)delegate
{
    self = [super initWithNibName:@"ctdAlertViewController" bundle:nil];
    if (self) {
        type = typeAlert;
        _delegate = delegate;
        UIImage* image = [UIImage imageNamed:@"box_alert_white.png"];
        [self.view setBackgroundColor:[UIColor colorWithPatternImage: [self imageWithImage:image scaledToSize:CGSizeMake(491,268)]]];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setWantsFullScreenLayout:YES];
    [self showMessage];
    
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)newSize {
    //UIGraphicsBeginImageContext(newSize);
    UIGraphicsBeginImageContextWithOptions(newSize, NO, 0.0);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

- (void)showMessage{
    if(type == kAlertForNoConnection){
        [message setText:MESSAGE_NO_INTERNET_CONNECTION];
    }else if(type == kAlertEmptyFieldEmployeeId){
        [message setText:MESSAGE_EMPTY_FIELD_EID];
    }else if(type == kAlertInvalidEmployeeId){
        [message setText:MESSAGE_INVALID_EMPLOYEE_ID];
    }else if(type == kAlertErrorAlreadyCheckOut){
        [message setText:MESSAGE_ERROR_ALREADY_CHECKOUT];
    }else if(type == kAlertErrorAlreadyCheckIn){
        [message setText:MESSAGE_ERROR_ALREADY_CHECKIN];
    }else{
         [message setText:MESSAGE_EXCEPTION];
    }
    message.numberOfLines = 0;
    message.textAlignment = NSTextAlignmentCenter;
}

- (IBAction)didOkButtonCLicked:(id)sender{
    if ([_delegate respondsToSelector:@selector(dismissAlert)]) {
        [_delegate dismissAlert];
    }
}

- (void)invalidate{
    _delegate = nil;
}

@end
