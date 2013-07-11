//
//  ctdWelcomeViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdWelcomeViewController.h"
#import "ctdProfileViewController.h"
#import "ctdVoucherViewController.h"
#import "ctdDailyAttendaceViewController.h"
#import "ctdLoginViewController.h"
#import "ctdLocalStorage.h"

@interface ctdWelcomeViewController ()

@end

@implementation ctdWelcomeViewController


@synthesize welcome;
@synthesize statusCheck;
@synthesize checkInButton;
@synthesize checkOutButton;
@synthesize profileButton;
@synthesize voucherButton;
@synthesize dailyAttendanceButton;
@synthesize attendanceListButton;
@synthesize signOutButton;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    welcome.text = [NSString stringWithFormat:@"Welcome, %@",[self getNameUser]];
    self.title = @"Welcomea";
}

-(NSString*)getNameUser{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc] init];
    return [localStorage getNameUserFacebook];
}

-(void)viewWillAppear:(BOOL)animated{
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)didCheckInClicked:(id)sender{
     NSString* totalProductLoadedStr = [NSString stringWithFormat:@"You have checked in at %@", [self getCurrentDate]];
    statusCheck.text = totalProductLoadedStr;
}

- (IBAction)didCheckOutClicked:(id)sender{
    NSString* totalProductLoadedStr = [NSString stringWithFormat:@"You have checked out at %@", [self getCurrentDate]];
    statusCheck.text = totalProductLoadedStr;
}

- (IBAction)didProfileClicked:(id)sender{
    [self goToProfile];
}

- (IBAction)didVoucherClicked:(id)sender{
    [self goToVoucher];
}

- (IBAction)didDailyAttendanceClicked:(id)sender{
    [self goToDailyAttendance];
}

- (IBAction)didAttendanceListClicked:(id)sender{
    [self goToAttendanceList];
}

- (IBAction)didSignOutClicked:(id)sender{
    ctdLoginViewController *loginViewController = [[ctdLoginViewController alloc]initWithNibName:@"ctdLoginViewController" bundle:nil];
    [self.navigationController pushViewController:loginViewController animated:YES];
}

-(void) goToProfile{
    ctdProfileViewController *profileViewController = [[ctdProfileViewController alloc]initWithNibName:@"ctdProfileViewController" bundle:nil];
    [self.navigationController pushViewController:profileViewController animated:YES];
}

-(void) goToVoucher{
    ctdVoucherViewController *voucherViewController = [[ctdVoucherViewController alloc]initWithNibName:@"ctdVoucherViewController" bundle:nil];
    [self.navigationController pushViewController:voucherViewController animated:YES];
}

-(void) goToDailyAttendance{
    ctdDailyAttendaceViewController *dailyAttendanceViewController = [[ctdDailyAttendaceViewController alloc]initWithNibName:@"ctdDailyAttendaceViewController" bundle:nil];
    [self.navigationController pushViewController:dailyAttendanceViewController animated:YES];
}

-(void) goToAttendanceList{
    ///
    ///
    ///
}

-(NSString*) getCurrentDate {
    NSDate *today = [NSDate date];
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    // display in 12HR/24HR (i.e. 11:25PM or 23:25) format according to User Settings
    [dateFormatter setTimeStyle:NSDateFormatterShortStyle];
    NSString *currentTime = [dateFormatter stringFromDate:today];
    NSLog(@"User's current time in their preference format:%@",currentTime);
    return currentTime;
}

@end
