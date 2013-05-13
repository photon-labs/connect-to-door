//
//  ctdWelcomeViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ctdWelcomeViewController : UIViewController{
    
}


@property (nonatomic, strong) IBOutlet UILabel *welcome;
@property (nonatomic, strong) IBOutlet UILabel *statusCheck;
@property (nonatomic, strong) IBOutlet UIButton *checkInButton;
@property (nonatomic, strong) IBOutlet UIButton *checkOutButton;
@property (nonatomic, strong) IBOutlet UIButton *profileButton;
@property (nonatomic, strong) IBOutlet UIButton *voucherButton;
@property (nonatomic, strong) IBOutlet UIButton *dailyAttendanceButton;
@property (nonatomic, strong) IBOutlet UIButton *attendanceListButton;
@property (nonatomic, strong) IBOutlet UIButton *signOutButton;

- (IBAction)didCheckInClicked:(id)sender;
- (IBAction)didCheckOutClicked:(id)sender;
- (IBAction)didProfileClicked:(id)sender;
- (IBAction)didVoucherClicked:(id)sender;
- (IBAction)didDailyAttendanceClicked:(id)sender;
- (IBAction)didAttendanceListClicked:(id)sender;
- (IBAction)didSignOutClicked:(id)sender;

@end